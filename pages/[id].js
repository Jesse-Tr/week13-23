import Layout from "@/components/layout";
import { getAllIds, getData } from "@/lib/data";
import Link from "next/link";




// define a getSaticsProps() function to have next.js retrieve data to use for dynamic page - this name is defined by next.js
export async function getStaticProps({params}){
       const itemData = await getData(params.id);
       
       return{
            props: {
                itemData,
               
            }
       };

}

// define a getStaticPaths() function to tell next.js all valid URLs: 1,2,3,4 
// - this name is defined by next.js
export async function getStaticPaths(){
    const paths = await getAllIds();
    return{
        paths,
        fallback: false
    };
}




// export our dynamically routed page component Entry
export default function Entry( {itemData} ){
    return(
        <Layout>
            <article className="card col-6">
            <div className="card-body">
                <h5 className="card-title">post id: {itemData.ID}</h5>
                
                <Link href={itemData.guid}><h6 className="btn btn-primary mt-3">go to post</h6> </Link>
                     
            </div>
            </article>
        </Layout>
    );
}
