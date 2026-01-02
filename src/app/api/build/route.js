import { exec } from "child_process";
import { NextResponse } from "next/server";

export async function POST() {
  return new Promise((resolve) => {
    exec(
      "bash /home/flower/public_html/flowershop/build.sh",
      (error, stdout, stderr) => {
        if (error) {
          resolve(
            NextResponse.json(
              { success: false, error: stderr },
              { status: 500 }
            )
          );
        } else {
          resolve(
            NextResponse.json({
              success: true,
              output: stdout,
            })
          );
        }
      }
    );
  });
}
