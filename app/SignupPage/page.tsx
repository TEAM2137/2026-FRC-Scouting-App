import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldTitle,
} from "@/components/ui/field"
import SignInForm from "@/components/auth/SignInForm"

const Page = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <Card>
        <CardHeader>
          <CardTitle>Sign Up for an Account</CardTitle>
          <CardDescription>Create your account by filling the form below.</CardDescription>
          <CardAction>
            <Button variant="link">Already have an account? Sign In</Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-1">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Email@Email.com"
                  required
                />
              </div>
              <div className="center grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
              </div>
              <div>
                <Input id="password" type="password" required placeholder="P455w0rd H3r3" />
                <Button type="submit" className="w-full">
                  Sign In
                </Button>
              </div>
              <div>
                <label htmlFor="PhoneNumber">Phone Number</label>
                <Input id="PhoneNumber" type="tel" placeholder="123-456-7890" required />
              </div>
              <div>
                <Checkbox className="h-6 w-6 text-green-500" required />
                <label htmlFor="terms">I am responsible for my and my teams actions. By using this app, your team will not add bad data into the database and will input data that is meaningful to the database</label>
              </div>
              
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
    )
    }
//get the user input for email and password finished on tuesday
export default Page;