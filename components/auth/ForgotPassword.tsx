import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const Page = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-comicsans dark:bg-black">
      {/* You must wrap the sub-components in the main Card component */}
      <Card className="w-[350px]"> 
        <CardHeader>
          <CardTitle>Forgot Password</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3">
            <Label htmlFor="email">Manager Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="John.Doe@email.com"
              required
            />
          </div>
        </CardContent>
        <CardFooter>
          {/* w-full makes the button span the full width of the card */}
          <Button variant="outline" className="w-full" type="submit">
            Send Reset Link
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export default Page