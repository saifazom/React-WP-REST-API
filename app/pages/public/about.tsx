import Greeting from "~/components/Greeting";

export default function About() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 border-b-2 pb-3">About Us</h1>

      <Greeting name="Rashed" />
    </div>
  );
}
