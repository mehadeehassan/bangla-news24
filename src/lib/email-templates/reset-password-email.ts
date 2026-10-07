interface ResetPasswordEmailProps {
  userName: string;
  resetUrl: string;
}

export const resetPasswordEmail = ({
  userName,
  resetUrl,
}: ResetPasswordEmailProps) => {
  return `
    <!DOCTYPE html>
    <html lang="bn">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>পাসওয়ার্ড রিসেট করুন</title>
      </head>

      <body
        style="
          margin: 0;
          padding: 0;
          background-color: #f8fafc;
          font-family: Arial, Helvetica, sans-serif;
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

              <!-- Main Card -->
              <table
                width="100%"
                cellpadding="0"
                cellspacing="0"
                border="0"
                style="
                  max-width: 520px;
                  background-color: #ffffff;
                  border: 1px solid #e2e8f0;
                  border-radius: 16px;
                  overflow: hidden;
                "
              >

                <!-- Header -->
                <tr>
                  <td
                    style="
                      padding: 28px 32px;
                      text-align: center;
                      background-color: #dc2626;
                    "
                  >
                    <h1
                      style="
                        margin: 0;
                        color: #ffffff;
                        font-size: 24px;
                        font-weight: 800;
                      "
                    >
                      BanglaNews24
                    </h1>
                  </td>
                </tr>

                <!-- Content -->
                <tr>
                  <td style="padding: 36px 32px;">

                    <h2
                      style="
                        margin: 0 0 16px;
                        color: #0f172a;
                        font-size: 22px;
                        font-weight: 700;
                      "
                    >
                      হ্যালো ${userName} 👋
                    </h2>

                    <p
                      style="
                        margin: 0 0 16px;
                        color: #475569;
                        font-size: 15px;
                        line-height: 1.7;
                      "
                    >
                      আপনার BanglaNews24 অ্যাকাউন্টের পাসওয়ার্ড রিসেট করার
                      অনুরোধ পাওয়া গেছে।
                    </p>

                    <p
                      style="
                        margin: 0 0 28px;
                        color: #475569;
                        font-size: 15px;
                        line-height: 1.7;
                      "
                    >
                      নতুন পাসওয়ার্ড সেট করতে নিচের বাটনে ক্লিক করুন।
                    </p>

                    <!-- Button -->
                    <table
                      width="100%"
                      cellpadding="0"
                      cellspacing="0"
                      border="0"
                    >
                      <tr>
                        <td align="center">
                          <a
                            href="${resetUrl}"
                            style="
                              display: inline-block;
                              padding: 13px 28px;
                              background-color: #dc2626;
                              color: #ffffff;
                              text-decoration: none;
                              font-size: 14px;
                              font-weight: 700;
                              border-radius: 8px;
                            "
                          >
                            পাসওয়ার্ড রিসেট করুন
                          </a>
                        </td>
                      </tr>
                    </table>

                    <!-- Fallback URL -->
                    <p
                      style="
                        margin: 28px 0 8px;
                        color: #64748b;
                        font-size: 13px;
                        line-height: 1.6;
                      "
                    >
                      বাটনে ক্লিক করতে সমস্যা হলে নিচের লিংকটি ব্রাউজারে
                      ওপেন করুন:
                    </p>

                    <p
                      style="
                        margin: 0;
                        word-break: break-all;
                        color: #dc2626;
                        font-size: 12px;
                        line-height: 1.6;
                      "
                    >
                      ${resetUrl}
                    </p>

                    <!-- Security Notice -->
                    <div
                      style="
                        margin-top: 28px;
                        padding: 14px 16px;
                        background-color: #fef2f2;
                        border-radius: 8px;
                        border-left: 4px solid #dc2626;
                      "
                    >
                      <p
                        style="
                          margin: 0;
                          color: #7f1d1d;
                          font-size: 13px;
                          line-height: 1.6;
                        "
                      >
                        আপনি যদি এই পাসওয়ার্ড রিসেটের অনুরোধ না করে থাকেন,
                        তাহলে এই ইমেইলটি উপেক্ষা করুন। আপনার অ্যাকাউন্ট
                        নিরাপদ থাকবে।
                      </p>
                    </div>

                  </td>
                </tr>

                <!-- Footer -->
                <tr>
                  <td
                    style="
                      padding: 20px 32px;
                      text-align: center;
                      border-top: 1px solid #e2e8f0;
                    "
                  >
                    <p
                      style="
                        margin: 0;
                        color: #94a3b8;
                        font-size: 12px;
                        line-height: 1.6;
                      "
                    >
                      © ${new Date().getFullYear()} BanglaNews24
                    </p>

                    <p
                      style="
                        margin: 6px 0 0;
                        color: #94a3b8;
                        font-size: 12px;
                      "
                    >
                      এই ইমেইলটি স্বয়ংক্রিয়ভাবে পাঠানো হয়েছে।
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

