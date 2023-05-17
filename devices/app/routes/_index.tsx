import {
  redirect,
  type ActionArgs,
  type V2_MetaFunction,
  json,
} from "@remix-run/node";
import {
  Form,
  useActionData,
  useBeforeUnload,
  useNavigate,
  useNavigation,
} from "@remix-run/react";
import { useEffect } from "react";
import { PATHS } from "~/constants/paths";
import login from "~/services/login";
import { commitSession, getSession } from "~/services/session.server";
import getErrorMessage from "~/utils/get-error-message";

export const meta: V2_MetaFunction = () => {
  return [{ title: "New Remix App" }];
};

export default function Index() {
  const actionData = useActionData();
  const navigation = useNavigation();

  return (
    <main className="bg-primary h-screen w-screen grid place-items-center">
      <div className="bg-white w-full max-w-sm flex flex-col px-6 py-8 rounded-sm custom_shadow">
        <h1 className="text-center text-4xl mb-4">Login</h1>
        <Form method="post" className="space-y-2 text-center">
          <fieldset>
            <input
              type="email"
              id="email"
              name="email"
              autoComplete="username"
              placeholder="Email Address"
              required
            />
          </fieldset>
          <fieldset>
            <input
              type="password"
              id="password"
              name="password"
              autoComplete="new-password"
              placeholder="Password"
              required
            />
          </fieldset>
          {actionData?.error ? (
            <p role="alert" className="text-red-500 text-start text-sm">
              {actionData?.error}
            </p>
          ) : null}
          <button
            type="submit"
            className="bg-[#0376bde5] hover:bg-[#0376bd] disabled:bg-[#0376bde5]/50 transition-all duration-200 block mx-auto !mt-6 text-white py-3 px-4"
            disabled={navigation.state === "submitting"}
          >
            Log in
          </button>
        </Form>
      </div>
    </main>
  );
}

export async function loader({ request }: ActionArgs) {
  const session = await getSession(request.headers.get("Cookie"));

  if (session.has("token")) {
    return redirect(PATHS.DEVICES);
  }

  return json({});
}

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();

  try {
    const response = await login({
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    });

    const session = await getSession(request.headers.get("Cookie"));

    session.set("token", response.data);

    return redirect(PATHS.DEVICES, {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    });
  } catch (error) {
    return { success: false, error: getErrorMessage(error) };
  }
}
