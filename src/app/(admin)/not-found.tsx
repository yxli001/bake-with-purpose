"use client";
import { useRouter } from "next/navigation";
import Button from "@/components/Button/Button";

export const metadata = {
    title: "Not Found",
};

const NotFound = () => {
    const router = useRouter();

    return (
        <div className="not-found">
            <div className="big">404</div>
            <div className="small">
                Nothing to see here ... Check out the rest of our amazing site
            </div>
            <div className="buttons">
                <Button
                    onClick={() => router.push("/")}
                    className="link-button"
                >
                    Home
                </Button>
                <Button
                    onClick={() => router.push("/events")}
                    className="link-button"
                >
                    Events
                </Button>
                <Button
                    onClick={() => router.push("/team")}
                    className="link-button"
                >
                    Team
                </Button>
            </div>
        </div>
    );
};

export default NotFound;
