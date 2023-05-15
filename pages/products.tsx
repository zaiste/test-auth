import { FetchProductsDocument, FetchProductsQuery, Product } from '@/generated/graphql';
import { useQuery } from '@apollo/client';
import Link from 'next/link';
import Image from 'next/image'

export default function ProductsPage() {
  const { data, loading } = useQuery<FetchProductsQuery>(FetchProductsDocument, { variables: { first: 8, channel: "default-channel" } })

  return (
    <main className={`flex min-h-screen flex-col items-center p-24`}>
      <div className="mb-32 grid text-center lg:mb-0 lg:grid-cols-4 lg:text-left gap-4">
        {data?.products?.edges.map((edge) => {
          return (
            <div key={edge.node.id}>
              <div className="min-h-80 overflow-hidden rounded-md bg-slate-50 h-80">
                <Image
                  width={256}
                  height={256}
                  alt={edge.node.thumbnail?.alt!}
                  src={edge.node.thumbnail?.url!}
                  className="object-cover h-full w-full p-4"
                />
              </div>
              <div
                className="group rounded-lg border border-transparent px-5 py-4"
              >

                <h2 className={`text-2xl font-semibold`}>
                  {edge.node.name}
                </h2>
              </div>
            </div>
          )
        })}
      </div>
    </main>
  );
}