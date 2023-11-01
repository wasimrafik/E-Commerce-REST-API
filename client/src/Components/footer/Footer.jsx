import React from "react";

const Footer = () => {
  return (
    <div className="mt-10">
      <div class="grid grid-rows-1 grid-flow-col gap-4 bg-black text-white text-center mt-10 pt-10">
       <div>
       <div className="gap-3 ">
          <div className="text-xl mb-2 font-bold">Company</div>
          <div><button className=" hover:bg-white hover:text-black p-2 rounded-lg">About Us</button> </div>
          <div><button className=" hover:bg-white hover:text-black p-2 rounded-lg">Blog</button>  </div>
          <div><button className=" hover:bg-white hover:text-black p-2 rounded-lg">About Us</button>  </div>
          <div><button className=" hover:bg-white hover:text-black p-2 rounded-lg mb-10">Press</button>  </div>
        </div>
       </div>
        <div>
          <div  className="text-xl mb-2 font-bold">Solutions</div>
          <div><button className=" hover:bg-white hover:text-black p-2 rounded-lg">Marking</button>  </div>
          <div><button className=" hover:bg-white hover:text-black p-2 rounded-lg">Support</button>  </div>
          <div><button className=" hover:bg-white hover:text-black p-2 rounded-lg">Insights</button>  </div>
          <div><button className=" hover:bg-white hover:text-black p-2 rounded-lg mb-10">Commerce</button>  </div>
        </div>
        <div>
          <div  className="text-xl mb-2 font-bold">Legal & Documents</div>
          <div><button  className=" hover:bg-white hover:text-black p-2 rounded-lg">API Status</button>  </div>
          <div><button  className=" hover:bg-white hover:text-black p-2 rounded-lg">Claim</button>  </div>
          <div><button  className=" hover:bg-white hover:text-black p-2 rounded-lg">Terms</button>  </div>
          <div><button  className=" hover:bg-white hover:text-black p-2 rounded-lg mb-10">Policy</button>  </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
