
import { useEffect, useState } from "react";
const useRole = (email) => {
  const [role, setRole] = useState('');
  useEffect(() => {
    if (email) {
      
      fetch(`https://beche-fel-server.vercel.app/users/role/${email}`)
        .then((res) => res.json())
        .then((data) => {
          setRole(data)
        });
    }
  }, [email]);
  return role ;
};

export default useRole;
