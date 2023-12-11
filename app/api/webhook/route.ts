import Stripe from "stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";


import { db } from "@/lib/db";
import { stripe } from "@/lib/stripe";



export async function POST(req: Request) {
    const body = await req.text();

    const signature = headers().get("stripe-signature") as string;

    let event: Stripe.Event;
    try {
        event = stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET!
        );

    } catch (error) {
        return new NextResponse(` webhook Error`, { status: 400 });

    }
    const session = event.data.object as Stripe.Checkout.Session;
    const userId = session?.metadata?.userId;
    const courseId = session?.metadata?.courseId;

    if (event.type === "checkout.session.completed") {
        if (!userId || !courseId) {
            return new NextResponse(`webhook Error: Missing metadata`, {
                status:
                    400
            });
        }

        await db.purchase.create({
            data: {
                courseId: courseId,
                userId: userId,
            }
        })
    } else {
        return new NextResponse(`webhook Error: Unhandled event type ${event.type}`, { status: 200 })
    }
    return new NextResponse(null, { status: 200 })
}