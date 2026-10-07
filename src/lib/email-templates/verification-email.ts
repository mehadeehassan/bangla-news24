interface VerificationEmailProps {
  userName: string;
  verificationUrl: string;
}

export const verificationEmail = ({
  userName,
  verificationUrl,
}: VerificationEmailProps) => {
  return `
    <!DOCTYPE html>
    <html lang="bn">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>ইমেইল ভেরিফিকেশন</title>
      </head>

      <body
        style="
          margin: 0;
          padding: 0;
          background-color: #f8fafc;
          font-family: Arial, Helvetica, sans-serif;
          color: #1e293b;
        "
      >
        <table
          width="100%"
          cellpadding="0"
          cellspacing="0"
          border="0"
          style="background-color: #f8fafc; padding: 40px 16px;"
        >
          <tr>
            <td align="center">

              <table
                width="100%"
                cellpadding="0"
                cellspacing="0"
                border="0"
                style="
                  max-width: 600px;
                  background-color: #ffffff;
                  border-radius: 16px;
                  overflow: hidden;
                  border: 1px solid #e2e8f0;
                "
              >

                <!-- Header -->
                <tr>
                  <td
                    align="center"
                    style="
                      background-color: #dc2626;
                      padding: 28px 24px;
                    "
                  >
                    <div
                      style="
                        color: #ffffff;
                        font-size: 28px;
                        font-weight: 800;
                      "
                    >
                      BanglaNews24
                    </div>

                    <div
                      style="
                        margin-top: 6px;
                        color: #fee2e2;
                        font-size: 13px;
                      "
                    >
                      আপনার বিশ্বস্ত বাংলা সংবাদ মাধ্যম
                    </div>
                  </td>
                </tr>

                <!-- Content -->
                <tr>
                  <td style="padding: 40px 32px 32px;">

                    <h1
                      style="
                        margin: 0 0 16px;
                        font-size: 26px;
                        line-height: 1.4;
                        color: #0f172a;
                        text-align: center;
                      "
                    >
                      স্বাগতম, ${userName}! 👋
                    </h1>

                    <p
                      style="
                        margin: 0 0 12px;
                        font-size: 16px;
                        line-height: 1.8;
                        color: #475569;
                        text-align: center;
                      "
                    >
                      BanglaNews24-এ আপনার অ্যাকাউন্ট তৈরি করার জন্য
                      ধন্যবাদ।
                    </p>

                    <p
                      style="
                        margin: 0 0 28px;
                        font-size: 15px;
                        line-height: 1.8;
                        color: #64748b;
                        text-align: center;
                      "
                    >
                      আপনার ইমেইল ঠিকানাটি নিশ্চিত করতে নিচের
                      বাটনে ক্লিক করুন।
                    </p>

                    <!-- Verify Button -->
                    <div style="text-align: center; margin: 30px 0;">
                      <a
                        href="${verificationUrl}"
                        style="
                          display: inline-block;
                          background-color: #dc2626;
                          color: #ffffff;
                          text-decoration: none;
                          padding: 14px 30px;
                          border-radius: 8px;
                          font-size: 15px;
                          font-weight: 700;
                        "
                      >
                        ইমেইল ভেরিফাই করুন
                      </a>
                    </div>

                    <!-- Security Note -->
                    <div
                      style="
                        margin-top: 28px;
                        padding: 16px;
                        background-color: #fef2f2;
                        border-left: 4px solid #dc2626;
                        border-radius: 6px;
                      "
                    >
                      <p
                        style="
                          margin: 0;
                          font-size: 13px;
                          line-height: 1.7;
                          color: #7f1d1d;
                        "
                      >
                        <strong>নিরাপত্তা নোট:</strong>
                        আপনি যদি এই অ্যাকাউন্ট তৈরি না করে থাকেন,
                        তাহলে এই ইমেইলটি উপেক্ষা করতে পারেন।
                      </p>
                    </div>

                  </td>
                </tr>

                <!-- Footer -->
                <tr>
                  <td
                    style="
                      padding: 24px 32px;
                      background-color: #f8fafc;
                      border-top: 1px solid #e2e8f0;
                      text-align: center;
                    "
                  >
                    <p
                      style="
                        margin: 0 0 6px;
                        font-size: 13px;
                        font-weight: 700;
                        color: #475569;
                      "
                    >
                      BanglaNews24
                    </p>

                    <p
                      style="
                        margin: 0;
                        font-size: 12px;
                        color: #94a3b8;
                      "
                    >
                      আপনার বিশ্বস্ত সোর্স — সর্বশেষ খবর বাংলায়।
                    </p>

                    <p
                      style="
                        margin: 12px 0 0;
                        font-size: 11px;
                        color: #cbd5e1;
                      "
                    >
                      © 2026 BanglaNews24. All rights reserved.
                    </p>
                  </td>
                </tr>

              </table>

            </td>
          </tr>
        </table>
      </body>
    </html>
  `;
};