import { Alert, AlertDescription, AlertTitle } from "@/Components/ui/alert"
import { BellIcon, CheckCircle2Icon, XCircleIcon} from "lucide-react"
import React from "react"

type NotificationProps = {
    type?: "success" | "error" | "info";
    title: string;
    message: string;
};

export const Notification: React.FC<NotificationProps> = ({
    type = "info",
    title, 
    message,
}) => {
    const icon = {
        success: <CheckCircle2Icon className="h-5 w-5 text-green-500" />,
        error: <XCircleIcon className="h-5 w-5 text-red-500" />,
        info: <BellIcon className="h-5 w-5 text-blue-500" />,
    };

    return (
        <Alert className="border-l-4" variant="default">
        <div className="flex items-start gap-3">
            {icon[type]}
            <div>
            <AlertTitle className="font-semibold">{title}</AlertTitle>
            <AlertDescription>{message}</AlertDescription>
            </div>
        </div>
        </Alert>
    );
};