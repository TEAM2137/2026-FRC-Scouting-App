import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const thisIsTheSignupPage = () => {
  return (
   <><div className="flex min-h-screen items-center justify-center bg-blue-500">
        <h1> Welcome to the Signup Page of 2026-scouting-app </h1>
        <Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card Description</CardDescription>
    <CardAction>Card Action</CardAction>
  </CardHeader>
  <CardContent>
    <p>Card Content</p>
  </CardContent>
  <CardFooter>
    <p>Card Footer</p>
  </CardFooter>
</Card>
</div>

//get the user input for email and password finnished on tuesday


</>
  );
}
export default thisIsTheSignupPage;