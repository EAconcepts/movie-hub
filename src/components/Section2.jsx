import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import useGet from './helpers/useGet';

const Section2 = ({ imageBaseUrl }) => {
 
  return (
    <div className="w-full px-4 md:px-[130px] -mt-2 pt-[72px] flex flex-col bg-black text-white font-poppins ">
      <UpdatedMovies imageBaseUrl={imageBaseUrl} />
      <Trending imageBaseUrl={imageBaseUrl} />
      <NewRelease
        imageBaseUrl={imageBaseUrl}
        title="New Release - Series"
        url="https://api.themoviedb.org/3/tv/top_rated"
      />
      <NewRelease
        imageBaseUrl={imageBaseUrl}
        title="New Release - Movies"
        url="https://api.themoviedb.org/3/tv/popular"
      />
      <NewRelease
        imageBaseUrl={imageBaseUrl}
        title="Recommended"
        url="https://api.themoviedb.org/3/movie/top_rated"
      />
    </div>
  );
};
export default Section2

export const UpdatedMovies=({imageBaseUrl})=>{
     const [recentlyUpdated, setRecentlyUpdated] = useState([]);
     const { data: updatedMovies, mutationName: UpdatedMutation } = useGet(
       "https://api.themoviedb.org/3/movie/now_playing"
     );
     
     useEffect(()=>{
        UpdatedMutation.mutate()
     },[])
    return (
      <>
        <h3 className="font-[500] text-[18px] md:text-[24px] leading-[36px]">
          Recenly Updated
        </h3>
        {

        }
        <div className=" w-full md:h-[103px] mt-[24px] flex flex-wrap flex-row gap-x-[40px] gap-y-[22px] items-center">
          {updatedMovies?.results?.slice(0, 3).map((movie) => (
            <div key={movie.id} className="flex flex-row font-poppins font-[400] leading-[24px] text-[14px] h-full rounded-[5px] gap-x-[11.5px]">
              <img
                src={`${imageBaseUrl}${movie.poster_path}`}
                className="w-[64px] h-full"
              />
              <div className="flex flex-col">
                <p className="font-[500]">{movie.title}</p>
                <p className="">{movie.release_date}</p>
              </div>
            </div>
          ))}
          <div
            className="md:w-[88px] p-3 md:h-[88px] bg-[#D9D9D9] rounded-full flex items-center justify-center"
          >
            <svg
              width="32"
              height="32"
              viewBox="0 0 36 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M36 16L19.4104 32L17.8237 30.4697L31.6983 17.0882H0V14.9118H31.6983L17.8237 1.53029L19.4104 0L36 16Z"
                fill="black"
              />
            </svg>
          </div>
        </div>
      </>
    );
}
export const Trending=({imageBaseUrl})=>{
    // const [trendingMovies, setTrendingMovies] = useState([])
    const { data: trendingMovies, mutationName: trendingMutation } = useGet(
      "https://api.themoviedb.org/3/movie/popular"
    );

    useEffect(() => {
      trendingMutation.mutate();
    }, []);
    return (
      <div className="w-full mt-[72px]">
        <Header title='Trending'/>
        <div className="w-full flex flex-row h-[341px] mt-[24px] gap-x-[33px] font-poppins">
          {trendingMovies?.results?.slice(0, 3).map((movie) => (
            <div
              key={movie.id}
              className="relative w-[352px] h-full flex flex-col"
            >
              <img
                src={`${imageBaseUrl}${movie.poster_path}`}
                className="absolute w-[325px] h-[293px] rounded-[10px]"
              />
              <div className="flex flex-col justify-between z-10 h-full">
                <div className="w-full flex flex-row justify-between text-[12px] font-500 text-white z-10 py-[8px] px-[16px]">
                  <div className="flex flex-row items-center gap-x-[8px]  ">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M6.64988 0.349976C6.78248 0.349976 6.90966 0.402654 7.00343 0.496422C7.0972 0.59019 7.14988 0.717367 7.14988 0.849976V3.02198C7.14988 3.15458 7.0972 3.28176 7.00343 3.37553C6.90966 3.4693 6.78248 3.52198 6.64988 3.52198C6.51727 3.52198 6.39009 3.4693 6.29632 3.37553C6.20255 3.28176 6.14988 3.15458 6.14988 3.02198V1.37198C4.88909 1.48409 3.70246 2.01631 2.78026 2.88332C1.85806 3.75032 1.25369 4.90188 1.06407 6.15336C0.874454 7.40484 1.11056 8.68374 1.73454 9.78502C2.35851 10.8863 3.33422 11.7462 4.5052 12.2267C5.67619 12.7073 6.97463 12.7807 8.19234 12.4353C9.41005 12.0898 10.4765 11.3455 11.2207 10.3216C11.9648 9.29769 12.3437 8.05356 12.2964 6.78868C12.2491 5.52381 11.7784 4.31144 10.9599 3.34598C10.9153 3.29625 10.8811 3.23808 10.8593 3.17491C10.8375 3.11175 10.8287 3.04486 10.8332 2.9782C10.8377 2.91154 10.8555 2.84647 10.8856 2.78682C10.9157 2.72717 10.9575 2.67416 11.0084 2.63092C11.0593 2.58767 11.1184 2.55508 11.1822 2.53505C11.2459 2.51502 11.313 2.50797 11.3795 2.51432C11.446 2.52066 11.5106 2.54027 11.5694 2.57199C11.6282 2.6037 11.68 2.64688 11.7219 2.69898C12.7018 3.85452 13.2577 5.31004 13.2977 6.82461C13.3376 8.33918 12.8592 9.82198 11.9416 11.0276C11.024 12.2332 9.72216 13.0893 8.25167 13.4542C6.78117 13.8191 5.23016 13.671 3.85534 13.0342C2.48053 12.3975 1.36436 11.3104 0.691586 9.9529C0.0188093 8.59538 -0.170236 7.04881 0.155745 5.5692C0.481725 4.08958 1.30318 2.76565 2.48415 1.81652C3.66512 0.867401 5.13478 0.350004 6.64988 0.349976ZM7.40988 7.57998L9.92587 4.07298C9.95937 4.02483 9.97488 3.96645 9.96968 3.90803C9.96448 3.84961 9.93891 3.79488 9.89744 3.75341C9.85597 3.71194 9.80124 3.68637 9.74282 3.68117C9.6844 3.67597 9.62602 3.69148 9.57787 3.72498L6.06887 6.23998C5.95597 6.32126 5.86209 6.42611 5.79372 6.54727C5.72535 6.66844 5.68413 6.80301 5.67291 6.94167C5.6617 7.08034 5.68076 7.21979 5.72877 7.35036C5.77678 7.48094 5.85259 7.59951 5.95097 7.69789C6.04934 7.79626 6.16792 7.87207 6.29849 7.92008C6.42906 7.9681 6.56851 7.98715 6.70718 7.97594C6.84584 7.96472 6.98042 7.9235 7.10158 7.85513C7.22274 7.78676 7.32759 7.69288 7.40887 7.57998H7.40988Z"
                        fill="white"
                      />
                    </svg>
                    <span>3:12:00</span>
                  </div>
                  <div className="flex flex-row items-center gap-x-[8px] text-[12px] font-500 text-white z-10">
                    <svg
                      width="16"
                      height="14"
                      viewBox="0 0 16 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M8 11.2516L12.635 14L11.405 8.82L15.5 5.33474L10.1075 4.87789L8 0L5.8925 4.87789L0.5 5.33474L4.5875 8.82L3.365 14L8 11.2516Z"
                        fill="white"
                      />
                    </svg>
                    <span>8.0</span>
                  </div>
                </div>
                <svg
                  className=' self-center'
                  width="49"
                  height="49"
                  viewBox="0 0 59 59"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M29.5 0C23.6655 0 17.9619 1.73014 13.1107 4.97164C8.25944 8.21315 4.47835 12.8204 2.24557 18.2108C0.0127819 23.6013 -0.571416 29.5327 0.566847 35.2552C1.70511 40.9776 4.51471 46.234 8.64036 50.3596C12.766 54.4853 18.0224 57.2949 23.7448 58.4332C29.4673 59.5714 35.3987 58.9872 40.7892 56.7544C46.1796 54.5216 50.7868 50.7406 54.0284 45.8893C57.2699 41.0381 59 35.3345 59 29.5C59 25.626 58.237 21.7899 56.7544 18.2108C55.2719 14.6317 53.099 11.3797 50.3596 8.64035C47.6203 5.90102 44.3683 3.72807 40.7892 2.24555C37.2101 0.76304 33.374 0 29.5 0ZM23.6 42.775V16.225L41.3 29.5L23.6 42.775Z"
                    fill="white"
                  />
                </svg>

                <div className="flex flex-row justify-between">
                  <h3 className="font-[600] text-[20px] leading-[36px]">
                    {movie.title.substring(0, 10)}
                  </h3>
                  <div className="">
                    <p className="bg-[#FF0000] rounded-[10px] p-[8px]">
                      Action
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
}
export const NewRelease=({imageBaseUrl, title, url})=>{

   const { data: newRelease, mutationName: newReleaseMutation } = useGet(url);

   useEffect(() => {
     newReleaseMutation.mutate();
   }, []);
  return (
    <div className="w-full mt-[72px]">
      <Header title={title} />
      <div className="w-full flex flex-row justify-center md:justify-start md:flex-nowrap flex-wrap gap-y-8 md:h-[341px] mt-[24px] gap-x-[33px] font-poppins">
        {newRelease?.results?.slice(0, 4).map((movie) => (
          <div
            key={movie.id}
            className="relative w-[75%] md:w-[352px] h-[340px] md:h-full flex flex-col"
          >
            <img
              src={`${imageBaseUrl}${movie.poster_path}`}
              className="absolute md:w-[325px] md:h-[293px] rounded-[10px]"
            />
            <div className="flex flex-col justify-between z-10 h-full">
              <div className="w-full flex flex-row justify-between text-[12px] font-500 text-white z-10 py-[8px] px-[16px]">
                <span className="bg-[#FF0000] text-[10px] p-[4px] rounded-[5px]">
                  EP 6
                </span>
              </div>
              <div className="flex flex-row flex-wrap justify-between">
                <h3 className="font-[600] text-[10px] leading-[36px]">
                  {movie.name?.substring(0, 10)}
                </h3>
                <div className="flex flex-row gap-x-[8px]">
                  <p className="bg-[#FF0000] text-[10px] md:text-[14px] rounded-md md:rounded-[10px] p-[3px] md:p-[8px]">
                    HD
                  </p>
                  <p className="border-[1px] border-[#FF0000] text-[10px] md:text-[14px] rounded-[10px] p-[4px] md:p-[8px]">
                    Season 1
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}



export const Header=({title})=>{
  return (
    <div className="w-full flex flex-row justify-between font-poppins text-[14px] md:text-[24px] leading-[36px]">
      <h3 className=" font-[700]">{title}</h3>
      <div className="flex  items-center gap-x-2">
        <h3 className=" opacity-50 font-[600]">view all</h3>
        <svg
          width="22"
          height="20"
          viewBox="0 0 22 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            opacity="0.5"
            d="M22 10L11.8619 20L10.8923 19.0436L19.3712 10.6801H0V9.31987H19.3712L10.8923 0.956429L11.8619 0L22 10Z"
            fill="white"
          />
        </svg>
      </div>
    </div>
  );
}