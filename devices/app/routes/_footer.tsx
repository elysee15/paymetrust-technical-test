import { Form } from "@remix-run/react";

const Footer = () => {
  return (
    <footer className="bg-[#D76945] py-4 absolute right-0 left-0 bottom-0">
      <div className="flex justify-center gap-2 text-center">
        <Form method="post">
          <input
            type="text"
            hidden
            name="notify"
            onChange={() => {}}
            value={"__notify"}
          />
          <button type="submit" className="bg-white">
            Notify
          </button>
        </Form>
        <button className="bg-primary text-white">Log out</button>
      </div>
    </footer>
  );
};

export default Footer;
