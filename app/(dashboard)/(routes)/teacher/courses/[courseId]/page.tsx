import { auth } from "@clerk/nextjs"
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

import { IconBadge } from "@/components/icon-badge";
import { CircleDollarSign, File, LayoutDashboard, ListChecks } from "lucide-react";

import { TitleForm } from "@/app/(dashboard)/(routes)/teacher/courses/[courseId]/_components/title-form";
import { DescriptionForm } from "@/app/(dashboard)/(routes)/teacher/courses/[courseId]/_components/deskription-form";
import { ImageForm } from "@/app/(dashboard)/(routes)/teacher/courses/[courseId]/_components/image-form";
import { CategoryForm } from "@/app/(dashboard)/(routes)/teacher/courses/[courseId]/_components/category-form";
import { PriceForm } from "@/app/(dashboard)/(routes)/teacher/courses/[courseId]/_components/price-form";
import { Attachmantform } from "@/app/(dashboard)/(routes)/teacher/courses/[courseId]/_components/attachmant-form.tsx";
import { ChaptersForm } from "@/app/(dashboard)/(routes)/teacher/courses/[courseId]/_components/chapter-form";
import { Banner } from "@/components/banner";
import { Actions } from "./_components/actions";



const CourseIdpage = async ({
    params
}: {

    params: { courseId: string }

}) => {
    const { userId } = auth();


    if (!userId) {
        return redirect('/')
    }

    const course = await db.course.findUnique({
        where: {
            id: params.courseId
        },
        include: {
            chapters: {
                orderBy: {
                    position: "asc"
                },
            },
            attachments: {
                orderBy: {
                    createdAt: "desc"
                },

            },
        },
    });

    const categories = await db.category.findMany({
        orderBy: {
            name: "asc"
        },
    });


    if (!course) {
        return redirect('/')
    }
    const requiredFields = [
        course.title,
        course.description,
        course.imageUrl,
        course.price,
        course.categoryId,
        course.chapters.some(chapter => chapter.isPublished),

    ];

    const totalFields = requiredFields.length;
    const completedFields = requiredFields.filter(Boolean).length;

    const completionText = `(${completedFields}/${totalFields})`

    const isComplete = requiredFields.every(Boolean);
    return (
        <>
        {!course.isPublished && (
            <Banner 
            label="This course is unpublished. It will not be visible to students."
            />
        )}
            <div className="p-6">
                <div className="flex item-center justify-between">
                    <div className="flex flex-col gap-y-2">
                        <h1 className="text-2xl font-medium">
                            Course setup
                        </h1>
                        <span className="text-sm text-slate-700">
                            Complete  all fields {completionText}
                        </span>
                    </div>
                    <Actions
                        disabled={!isComplete}
                        courseId={course.id}
                        isPublished={course.isPublished}
                    />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
                    <div>
                        <div className="flex items-center gap-x-2">
                            <IconBadge size="sm" variant="success"
                                icon={LayoutDashboard}
                            />
                            <h2 className="text-xl">
                                Customize your course
                            </h2>
                        </div>
                        <TitleForm
                            initialData={course}
                            courseId={course.id}
                        />
                        <DescriptionForm
                            initialData={course}
                            courseId={course.id}
                        />
                        <ImageForm

                            initialData={course}
                            courseId={course.id}
                        />
                        <CategoryForm
                            initialData={course}
                            courseId={course.id}
                            options={categories.map((category) => ({
                                label: category.name,
                                value: category.id
                            }))}
                        />


                    </div>
                    <div className="space-y-6">
                        <div>
                            <div className="flex items-center gap-x2">
                                <IconBadge icon={ListChecks} />
                                <h2 className="text-xl">
                                    Course chapters
                                </h2>
                            </div>
                            <ChaptersForm
                                initialData={course}
                                courseId={course.id}
                            />
                        </div>
                    </div>
                    <div className="flex items-center gap-x-2">
                        <IconBadge icon={CircleDollarSign} />
                        <h2 className="text-xl">
                            Sell your course
                        </h2>
                    </div>
                    <PriceForm
                        initialData={course}
                        courseId={course.id}
                    />


                </div>
                <div className="flex items-center gap-x-2">
                    <IconBadge icon={File} />
                    <h2 className="text-xl">
                        resources & attachmants
                    </h2>
                </div>
                <Attachmantform
                    initialData={course}
                    courseId={course.id}
                />
            </div>
        </>
    );
}

export default CourseIdpage;