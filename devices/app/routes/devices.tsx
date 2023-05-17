import { getDevices } from "~/services/devices";
import DeviceCount from "./_device-count";
import Footer from "./_footer";
import type { ActionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import getErrorMessage from "~/utils/get-error-message";
import { useLoaderData, useRevalidator } from "@remix-run/react";
import { useEffect } from "react";
import sendNotification from "~/services/sendNotification";
import { getSession } from "~/services/session.server";
import invariant from "tiny-invariant";

const FIVE_SECONDS = 5 * 1000;

const notificationPayload = {
  email: "elyseebleu1@gmail.com",
  name: "Bleu Sédé Elysée",
  repoUrl: "https://github.com/elysee15/paymetrust-technical-test.git",
  message:
    "J'ai vraiment adoré ce test j'ai pu apprendre de nouvelles techniques. Merci beaucoup pour cette opportunité.",
};

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  const values = Object.fromEntries(formData) as { notify: string };

  const session = await getSession(request.headers.get("Cookie"));
  const token = session.get("token");

  if (values.notify === "__notify") {
    invariant(token, "Token is required");
    try {
      await sendNotification(notificationPayload, token);
      console.log("Notification sent successfully");
    } catch (error) {
      console.log("Notification failed to send");
    }
  }

  return json({});
}

function DevicesPage() {
  const loaderData = useLoaderData<typeof loader>();
  const revalidator = useRevalidator();

  useEffect(() => {
    const interval = setInterval(() => {
      revalidator.revalidate();
    }, FIVE_SECONDS);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className="bg-secondary w-screen h-screen grid place-items-center overflow-hidden p-10">
      <DeviceCount count={(loaderData.devices || []).length} />
      <Footer />
    </main>
  );
}

export default DevicesPage;

export async function loader() {
  try {
    const response = await getDevices();

    return json({ devices: response?.devices, error: null });
  } catch (error) {
    return json({ devices: null, error: getErrorMessage(error) });
  }
}
