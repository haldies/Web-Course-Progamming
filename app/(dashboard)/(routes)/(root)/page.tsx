
import { auth } from "@clerk/nextjs"

import { redirect } from "next/navigation"
import { getDasboardCourses } from "@/actions/getdasboard-courses"
import { CoursesList } from "@/components/courses-list";
import { InfoCard } from "./_components/info-card";
import { CheckCircle, Clock } from "lucide-react";

export default async function Home() {
  const { userId } = auth();

  if (!userId) {
    return redirect("/")
  }

  const {
    completedCourses,
    coursesInProgress

  } = await getDasboardCourses(userId)
  return (
    <div className="p-6 space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

        <InfoCard
          icon={Clock}
          label="In Progress"
          numberOfitems={coursesInProgress.length}
        />
        <InfoCard
          icon={CheckCircle}
          label="completed"
          numberOfitems={completedCourses.length}
          variant="success"
        />
      </div>
      <CoursesList
        items={[...coursesInProgress, ...completedCourses]}
      />
    </div>

  )
}
