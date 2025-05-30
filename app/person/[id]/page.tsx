import Btn from "@/components/btn";
import Image from "next/image"

interface FinancialAsset {
    exchange:string;
    companyName:string; 
    numberOfShares:number;
    currencyCode:string;
}


interface Person {
  id: string;
  name: string;
  country:string;
  squareImage?: string;
  netWorth: number;
  industries: string[];
  financialAssets:FinancialAsset[];
  bio:string;
}

async function getPeopleDetail(id:string):Promise<Person>{
    const response = await fetch (`https://billions-api.nomadcoders.workers.dev/person/${id}`,{
        cache:"no-store",
    });
    if(!response.ok) throw new Error ("API 호출 실패");

    const data:Person = await response.json();

    if(typeof data.squareImage !== "string" || !data.squareImage.startsWith("https://")){
        data.squareImage="";
    }
    return data;
}

export default async function PersonDetail({params}:{params:{id:string}}){
    const {id} = await params;
    const detail = await getPeopleDetail(id);
    return(
        <div>
            <Btn/>
         <div>
           <h1 className="text-center text-4xl pb-10">Person Detail</h1>
            <Image src={detail.squareImage!} width={300} height={300} alt="상세정보"/>
            <div className="flex flex-col gap-4 p-6 bg-[#1a1a1a] rounded-lg shadow-md border border-gray-700 w-full my-5">
                <div>
                    <span className="text-gray-400 font-semibold">Name:</span>
                    <span className="ml-2 text-white">{detail.name}</span>
                </div>
                <div>
                    <span className="text-gray-400 font-semibold">NetWorth:</span>
                    <span className="ml-2 text-green-400 font-bold">${detail.netWorth.toLocaleString()}</span>
                </div>
                <div>
                    <span className="text-gray-400 font-semibold">Industries:</span>
                    <span className="ml-2 text-white">{detail.industries.join(', ')}</span>
                </div>
                <div>
                    <p className="text-gray-300 leading-relaxed">{detail.bio}</p>
                </div>
            </div>
         </div>
         <div>
            <h1 className="text-left text-3xl pb-10">Financial Assets</h1>
            <div className="grid lg:grid-cols-6 sm:grid-cols-3 gap-4">
            {detail.financialAssets.slice(0, 12).map((assets, index) => (
                <div
                 key={index}
                className="border border-gray-600 rounded-lg p-4 bg-[#1a1a1a] hover:shadow-lg hover:-translate-y-1 transition-transform duration-200"
                >
                <p className="text-base font-semibold text-gray-300">{assets.exchange}</p>
                <p className="text-sm truncate text-white mt-1" title={assets.companyName}>
                    {assets.companyName}
                </p>
                <p className="text-sm text-gray-400 mt-2">
                    {assets.numberOfShares.toLocaleString()} {assets.currencyCode}
                </p>
                </div>
            ))}
            </div>
         </div>
        </div>
    )
}