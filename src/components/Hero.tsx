import { Button } from "@/components/ui/button"

export default function Hero() {
  return (
    <section className="text-center py-20">
      <h2 className="text-5xl font-bold">
        Your menu, right in your hands
      </h2>
      <p className="mt-6 text-lg text-gray-600">
        Get your restaurant information with a touch of your fingers
      </p>
      <Button variant="outline" className="mt-6">Get Started</Button>
    </section>
  )
}