

import { IconBadge } from "@/components/icon-badge";
import { LucideIcon } from "lucide-react";

interface InfoCardProps {
    numberOfitems: number;
    variant?: "default" | "success";
    label: string;
    icon: LucideIcon;
}


export const InfoCard = ({
    variant,
    icon: Icon,
    numberOfitems,
    label,
}: InfoCardProps) => {
    return (
        <div className="border rounded-md flex items-center gap-x-2 p-3">
            <IconBadge
                variant={variant}
                icon={Icon}
            />
            <div>
                <p className="font-medium">
                    {label}

                </p>
                <p className="text-gray-500 text-sm">
                    {numberOfitems} {numberOfitems === 1 ? "course" : "Courses"}
                </p>
            </div>

        </div>

    )

}


