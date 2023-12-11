const { PrismaClient } = require("@prisma/client");

const database = new PrismaClient();


async function main() {

    try {
        await database.category.createMany({
            data: [
                { name: "Data Science" },
                { name: "Front Engineering" },
                { name: "Backend Engineering" },
                { name: "Mechine Learning & AI" },
            ]
        });
        console.log("success seding the database categories");
    } catch (error) {
        console.log("error seding the database categories", error);
    } finally {
        await database.$disconnect();
    }

}
main();