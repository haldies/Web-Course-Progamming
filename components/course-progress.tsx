import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"



interface CourseProgressProps {
    value: number
    variant?: "default" | "success"
    size?: "default"  | "sm"

}


const colorByVariants = {
    default: "text-sky-700",
    success: "text-green-700"

}

const sizerByVariants = {
    default: "text-sm",
    sm: "text-xs"

}

export const CourseProgress = ({
    value,
    variant,
    size,

}: CourseProgressProps) =>{
    return(
        <div>
            <Progress
            className="h-2"
            value={value}
            variant={variant}
            />
            <p className={cn(
                "font-medium mt-2 text-sky-700",
                colorByVariants[variant || "default"],
                sizerByVariants[size || "default"],
            )}>
                {Math.round(value)}% Complete

            </p>


        </div>
    )

}