import { getRequestConfig } from "next-intl/server";
import { cookies } from "next/headers";

export default getRequestConfig(async () => {
  const cookieStore = cookies();
  const localeCookie = cookieStore.get("locale")?.value;
  const locale = localeCookie || "en";

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
