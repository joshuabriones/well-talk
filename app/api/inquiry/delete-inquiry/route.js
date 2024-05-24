import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function DELETE(request) {
  const { inquiryId } = await request.json();

  try {
    const deleteInquiry = await db.inquiry.delete({
      where: {
        inquiryId: parseInt(inquiryId),
      },
    });

    return NextResponse.json({
      message: "Inquiry deleted",
      inquiry: deleteInquiry,
      status: 200,
    });
  } catch (error) {
    return NextResponse.json({ message: error.message, status: 500 });
  }
}

// import { db } from "@/lib/db";
// import { NextResponse } from "next/server";

// export async function PUT(request) {
//   const { inquiryId } = await request.json();

//   try {
//     const deleteInquiry = await db.inquiry.update({
//       where: {
//         inquiryId: parseInt(inquiryId),
//       },
//       data: {
//         isDeleted: true,
//       },
//     });

//     return NextResponse.json({
//       message: "Inquiry deleted",
//       inquiry: deleteInquiry,
//       status: 200,
//     });
//   } catch (error) {
//     return NextResponse.json({ message: error.message, status: 500 });
//   }
// }