export const forgotPasswordContent = (token: string) => {
	return `
		<!doctype html><html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office"><head><title></title><!--[if !mso]><!--><meta http-equiv="X-UA-Compatible" content="IE=edge"><!--<![endif]--><meta http-equiv="Content-Type" content="text/html; charset=UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style type="text/css">#outlook a { padding:0; }
          body { margin:0;padding:0;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%; }
          table, td { border-collapse:collapse;mso-table-lspace:0pt;mso-table-rspace:0pt; }
          img { border:0;height:auto;line-height:100%; outline:none;text-decoration:none;-ms-interpolation-mode:bicubic; }
          p { display:block;margin:13px 0; }</style><!--[if mso]>
        <noscript>
        <xml>
        <o:OfficeDocumentSettings>
          <o:AllowPNG/>
          <o:PixelsPerInch>96</o:PixelsPerInch>
        </o:OfficeDocumentSettings>
        </xml>
        </noscript>
        <![endif]--><!--[if lte mso 11]>
        <style type="text/css">
          .mj-outlook-group-fix { width:100% !important; }
        </style>
        <![endif]--><!--[if !mso]><!--><link href="https://fonts.googleapis.com/css?family=Ubuntu:300,400,500,700" rel="stylesheet" type="text/css"><style type="text/css">@import url(https://fonts.googleapis.com/css?family=Ubuntu:300,400,500,700);</style><!--<![endif]--><style type="text/css">@media only screen and (min-width:480px) {
        .mj-column-per-100 { width:100% !important; max-width: 100%; }
      }</style><style media="screen and (min-width:480px)">.moz-text-html .mj-column-per-100 { width:100% !important; max-width: 100%; }</style><style type="text/css"></style><style type="text/css">h3{
	      font-family: "IBM Plex Sans", sans-serif;
      }
      .logo p{
      	font-weight: 300;
	      margin: 0;
      }
      .logo p span{
      	font-weight: 500;
      }
      .reset_link{
      	text-align: center;
      }
      .reset_link a{
      	text-decoration: none;
	      color: #fff;
  	    display: inline-block;
	      background: #1c1503;
      	width: 100px;
     		text-align: center;
	      padding: 14px 16px;
      }</style></head><body style="word-spacing:normal;"><div><!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]--><div style="margin:0px auto;max-width:600px;"><table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;"><tbody><tr><td style="direction:ltr;font-size:0px;padding:20px 0;text-align:center;"><!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" width="600px" ><table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600" bgcolor="#ffffff" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]--><div style="background:#ffffff;background-color:#ffffff;margin:0px auto;max-width:600px;"><table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#ffffff;background-color:#ffffff;width:100%;"><tbody><tr><td style="direction:ltr;font-size:0px;padding:20px 0;text-align:center;"><!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:600px;" ><![endif]--><div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;"><table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%"><tbody><tr><td style="background-color:#FFFEF6;vertical-align:top;padding-top:12px;"><table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%"><tbody><tr><td align="center" class="logo" style="font-size:0px;padding:10px 25px;word-break:break-word;"><div style="font-family:IBM Plex Sans, sans-serif;font-size:32px;line-height:1;text-align:center;color:#000000;"><p>Budi<span>Fi</span></p></div></td></tr><tr><td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;"><p style="border-top:solid 4px #406829;font-size:1px;margin:0px auto;width:100%;"></p><!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" style="border-top:solid 4px #406829;font-size:1px;margin:0px auto;width:550px;" role="presentation" width="550px" ><tr><td style="height:0;line-height:0;"> &nbsp;
</td></tr></table><![endif]--></td></tr></tbody></table></td></tr></tbody></table></div><!--[if mso | IE]></td><td class="" style="vertical-align:top;width:600px;" ><![endif]--><div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;"><table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%"><tbody><tr><td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;"><div style="font-family:IBM Plex Sans, sans-serif;font-size:20px;font-weight:400;line-height:1;text-align:left;color:#1C1503;"><h3>Hi John,</h3><p>Forgot your password? no problem. Just click the button below to reset your password</p></div></td></tr></tbody></table></div><!--[if mso | IE]></td><td class="" style="vertical-align:top;width:600px;" ><![endif]--><div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;"><table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%"><tbody><tr><td align="left" class="reset_link" style="font-size:0px;padding:10px 25px;word-break:break-word;"><div style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:13px;line-height:1;text-align:left;color:#000000;"><a href="https://budifi.com/reset_password?token=${token}" target="_blank">Reset Password</a></div></td></tr></tbody></table></div><!--[if mso | IE]></td></tr></table><![endif]--></td></tr></tbody></table></div><!--[if mso | IE]></td></tr></table></td></tr><tr><td class="" width="600px" ><table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]--><div style="margin:0px auto;max-width:600px;"><table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;"><tbody><tr><td style="direction:ltr;font-size:0px;padding:20px 0;text-align:center;"><!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:600px;" ><![endif]--><div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;"><table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%"><tbody><tr><td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;"><div style="font-family:IBM Plex Sans, sans-serif;font-size:16px;font-style:italic;font-weight:300;line-height:1;text-align:left;color:#000000;">If you did not initiate this request, disregard this email and contact support immediately <a mailTo="support@budifi.com">support@budifi.com</a></div></td></tr></tbody></table></div><!--[if mso | IE]></td></tr></table><![endif]--></td></tr></tbody></table></div><!--[if mso | IE]></td></tr></table></td></tr></table><![endif]--></td></tr></tbody></table></div><!--[if mso | IE]></td></tr></table><![endif]--></div></body></html>
		`;
};