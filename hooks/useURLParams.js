import { useMemo } from "react";
import { decryptData, encryptData } from "../helpers/encrypt";
import { useSearchParams } from "next/navigation";

function useURLParams() {
  const searchParams = useSearchParams();
  const URLParams = useMemo(() => {
    if (searchParams.get("en")) {
      let key = process.env.ENCRYPT_KEY;

      //   let data = encryptData(searchParams.get("en"), key);

      let decrypt = decryptData(searchParams.get("en"), key);
      return decrypt;
    }

    return null;
  }, [searchParams]);

  return URLParams;
}

export default useURLParams;
