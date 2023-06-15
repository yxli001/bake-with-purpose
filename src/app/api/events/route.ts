import path from "path";
import { promises as fs } from "fs";
import { NextResponse } from "next/server";

export async function GET() {
    //Find the absolute path of the json directory
    const jsonDirectory = path.join(process.cwd(), "json");
    //Read the json data file data.json
    const fileContents = await fs.readFile(
        jsonDirectory + "/events.json",
        "utf8"
    );

    return NextResponse.json(JSON.parse(fileContents));
}
