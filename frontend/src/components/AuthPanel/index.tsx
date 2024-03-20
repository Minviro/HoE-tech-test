import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LoginContent } from "./LoginContent";
import { SignupContent } from "./SignupContent";

export const AuthPanel = () => {
	return (
		<Tabs defaultValue="login" className="w-[400px]">
			<TabsList className="grid w-full grid-cols-2">
				<TabsTrigger value="login">Log In</TabsTrigger>
				<TabsTrigger value="signup">Sign Up</TabsTrigger>
			</TabsList>
			<LoginContent />
			<SignupContent />
		</Tabs>
	);
};
