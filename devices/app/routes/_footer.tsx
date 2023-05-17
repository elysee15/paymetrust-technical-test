import { Form, useNavigation } from "@remix-run/react";

const Footer = () => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <footer className="bg-[#D76945] py-4 absolute right-0 left-0 bottom-0">
      <div className="flex justify-center gap-2 text-center">
        <Form method="post">
          <input
            type="text"
            hidden
            name="action"
            onChange={() => {}}
            value={"__notify"}
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-white disabled:bg-white/80"
          >
            Notify
          </button>
        </Form>
        <Form method="post">
          <input
            type="text"
            hidden
            name="action"
            onChange={() => {}}
            value={"__logout"}
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-primary text-white disabled:bg-primary/80"
          >
            Log out
          </button>
        </Form>
      </div>
    </footer>
  );
};

export default Footer;
