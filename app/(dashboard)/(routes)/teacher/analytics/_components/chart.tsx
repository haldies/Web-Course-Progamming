"use client";


import { Card } from "@/components/ui/card";
import {
    Line,
    Bar,
    BarChart,
    ResponsiveContainer,
    XAxis,
    YAxis,
    LineChart,
    CartesianGrid,

} from "recharts"

interface ChartProps {
    data: {
        name: string;
        total: number;
    }[];
}

export const Chart = ({
    data

}: ChartProps) => {
    return (
        <Card>
            <ResponsiveContainer width="100%" height={350}>
                <LineChart

                    data={data}
                >
                    <Line
                        dataKey="total"
                        stroke="#8884d8"
                        type="monotone"

                    />
                    <XAxis
                        dataKey="name"
                        stroke="#888888"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}


                    />
                    <YAxis
                        stroke="#888888"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={(value) => `$${value}`}
                    />

                    <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />

                </LineChart>

            </ResponsiveContainer>

        </Card>
    )
}