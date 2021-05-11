const hold = () =>
   new Promise((res) => {
      setTimeout(() => {
         res(true);
      }, 1000);
   });

export default hold;
