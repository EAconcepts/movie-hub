import axios from "axios";
import React from "react";
import { useEffect } from "react";
import Slider from "react-slick";
import SliderWrapper from "./_SlickSliderStyle";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import Loader from "react-js-loader";

const Hero = ({imageBaseUrl}) => {
  const apiKey = import.meta.env.VITE_TMDB_API_KEY;
  const [topRated, setTopRated] = useState([]);
  const [reloadTopRated, setReloadTopRated] = useState(false)

  const settings = {
    dots: true,
    autoplay: true,
    autoplaySpeed: 5000,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    speed: 500,
    arrows: false,
    adaptiveHeight: true,
    appendDots: (dots) => <ul>{dots}</ul>,
    customPaging: (i) => (
      <div className="ft-slick__dots--custom">
        <div className="loading" />
      </div>
    ),
  };
  const headers = {
    Authorization: `Bearer ${apiKey}`,
  };
  const movieDetailsMutation = useMutation({
    mutationFn: (movieId) =>
      axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
        { headers }
      ),
    onSuccess: (res) => {
    //   console.log(res.data);
      setTopRated((prevVals) =>{
        // prevVals && console.log([...prevVals].length);
        // prevVals && console.log([...prevVals]);

        if(prevVals && [...prevVals].length >4){
            return ([...prevVals])
        }else{
       return( prevVals&& [...prevVals, res.data])}
    });
    },
    onError: (err) => console.log(err),
    // onSettled: ()=>console.log(topRated)
  });
//   console.log(topRated)

  const topRatedMutation = useMutation({
    mutationFn: () =>
      axios.get(`https://api.themoviedb.org/3/movie/top_rated`, { headers }),
    onSuccess: (res) => {
    //   console.log(res.data.results)
      let fetchedMovies = res.data.results;
    //   let movies = getRandomMovies(fetchedMovies, 5);
      let movies = getRandom(fetchedMovies, 5);
      // console.log(movies)
        const uniqueId = new Set()
        const newMovies = []
        for(const obj of movies){
            if(!uniqueId.has(obj.id)){
                uniqueId.add(obj.id)
                newMovies.push(obj)
            }
        }
      // setTopRated(movies)
    //   console.log(newMovies)
      newMovies?.map((movie) => movieDetailsMutation.mutate(movie.genre_ids)
      );
    },
    onError: (err) => console.log(err),
  });
//   console.log(topRated);
  useEffect(() => {
    topRatedMutation.mutate();
  }, [reloadTopRated]);
//   let imageBaseUrl = `https://image.tmdb.org/t/p/original`;

  function getRandom(arr, numElements) {
    if (numElements > arr.length) {
      throw new Error("Cannot select more elements than the array contains.");
    }

    let result = [];
    const usedIndices = [];

    while (result.length < numElements) {
      const randomIndex = Math.floor(Math.random() * arr.length);

      if (!usedIndices.includes(randomIndex)) {
        usedIndices.push(randomIndex);
        result.push(arr[randomIndex]);
      }
    }

    return result = new Set(result);
  }
  const convertMinutes = (minutes) => {
    const totalMinutes = parseInt(minutes);
  let hours, mins, secs;
    if (isNaN(totalMinutes)) {
      alert("Please enter a valid number of minutes.");
      return;
    }
    const calculatedHours = Math.floor(totalMinutes / 60);
    const calculatedMinutes = totalMinutes % 60;
    const calculatedSeconds = (totalMinutes % 1) * 60;

    hours = calculatedHours;
    mins = calculatedMinutes;
    secs = calculatedSeconds;
    return `${hours}:${mins}:${secs}`
    // console.log(hours);
  };
  const errorFetching =(
    <div className="h-screen bg-slate-950 flex flex-col items-center justify-center">
              <div className="h-full flex flex-col justify-center items-center">
                <h2 className="text-red-400 text-[12px] md:text-[18px]">
                  Couldn't fetch movies{" "}
                  <button
                    onClick={() => setReloadTopRated((prev) => !prev)}
                    className=" underline"
                  >
                    Try again...
                  </button>
                </h2>
              </div>
            </div>
  )
  return (
    <SliderWrapper className="w-full bg-slate-950 h-fit   ">
      <Slider {...settings} className='w-full h-full'>
        {topRatedMutation.isPending ? (
          <div className="h-screen flex flex-col items-center justify-center">
            <div className="h-full flex flex-col justify-center">
              <Loader
                type="bubble-loop"
                bgColor="red"
                color="white"
                title={""}
                size={80}
              />
            </div>
          </div>
        ) : (
          topRatedMutation.isError && (
            errorFetching
          )
        )}
        {!topRatedMutation.isPending && topRatedMutation.isSuccess && topRated?.length>=1 && Array.from(new Set(topRated)).map((movie) => {
            return (
              <div
                key={movie.id}
                className={`relative w-full h-[500px] sm:h-[744px] flex flex-col bg-no-repeat bg-top bg-cover bg-transparent`}
              >
                <img
                  src={`${imageBaseUrl}${movie.backdrop_path}`}
                  className="absolute w-full -z-10 h-full object-cover bg-gradient-to-t from-slate-950 to-black brightness-50"
                />
                <div className="flex flex-col h-full justify-center">
                  <div className="flex flex-row justify-center gap-x-[44px] text-[12px] font-poppins font-[700] leading-[36px]">
                    <button className="flex flex-row items-center bg-[#FF0000] hover:bg-transparent hover:border-[3px] hover:border-[#ff0000] text-white rounded-[5px] md:p-[10px] px-[4px] gap-x-[10px]">
                      <span>Watch Now</span>
                      <svg
                        width="31"
                        height="31"
                        viewBox="0 0 31 31"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M15.5 0C12.4344 0 9.43763 0.909059 6.88867 2.61222C4.33971 4.31538 2.35303 6.73615 1.17987 9.5684C0.0067159 12.4007 -0.300236 15.5172 0.297835 18.5239C0.895906 21.5306 2.37214 24.2924 4.53985 26.4601C6.70756 28.6279 9.4694 30.1041 12.4761 30.7022C15.4828 31.3002 18.5993 30.9933 21.4316 29.8201C24.2639 28.647 26.6846 26.6603 28.3878 24.1113C30.0909 21.5624 31 18.5656 31 15.5C31 13.4645 30.5991 11.4489 29.8201 9.5684C29.0412 7.68786 27.8995 5.97915 26.4602 4.53984C25.0208 3.10054 23.3121 1.95881 21.4316 1.17987C19.5511 0.400919 17.5355 0 15.5 0ZM12.4 22.475V8.525L21.7 15.5L12.4 22.475Z"
                          fill="white"
                        />
                      </svg>
                    </button>
                    <button className="flex flex-row items-center border-[3px] hover:bg-[#ff0000] px-[4px] hover:border-none border-[#FF0000] text-white rounded-[5px] md:p-[10px] gap-x-[10px]">
                      <span>Watch Later</span>
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M10 0C4.5 0 0 4.5 0 10C0 15.5 4.5 20 10 20C15.5 20 20 15.5 20 10C20 4.5 15.5 0 10 0ZM13.55 13.8L9.47 11.29C9.17 11.11 8.99 10.79 8.99 10.44V5.75C9 5.34 9.34 5 9.75 5C10.16 5 10.5 5.34 10.5 5.75V10.2L14.34 12.51C14.7 12.73 14.82 13.2 14.6 13.56C14.38 13.91 13.91 14.02 13.55 13.8Z"
                          fill="white"
                        />
                      </svg>
                    </button>
                  </div>
                  <div className="md:w-[626px] px-2 flex flex-col mt-[55px]  md:ml-[160px] font-poppins text-white">
                    <h2 className=" font-poppins font-[700] leading-[48px] text-[16px] sm:text-[22px] md:text-[32px]">
                      {movie.title}
                    </h2>
                    <div className="flex flex-row items-center gap-x-[10px] flex-wrap mt-[8px]">
                      <div className="flex flex-row flex-wrap gap-x-[10px] text-[8px] sm:text-[12px] md:text-[16px] font-[poppins] font-[600] leading-[24px] text-black">
                        {movie.genres.map((genre) => (
                          <p
                            key={genre.id}
                            className=" rounded-xl md:rounded-[20px] p-[4px] sm:p-[7px] md:p-[10px] bg-white"
                          >
                            {genre.name}
                          </p>
                        ))}
                      </div>
                      <div className="flex flex-row items-center gap-x-[5.35px] text-[10px] md:text-base">
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 18 18"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M16.6445 1.93601H13.728C13.6696 1.93601 13.6136 1.95921 13.5723 2.00051C13.531 2.04182 13.5078 2.09783 13.5078 2.15625C13.5078 2.19378 13.5196 2.22735 13.5359 2.25797V3.93595C13.536 3.99744 13.5239 4.05835 13.5004 4.11517C13.4769 4.172 13.4424 4.22363 13.3989 4.26711C13.3555 4.3106 13.3038 4.34508 13.247 4.36858C13.1902 4.39208 13.1293 4.40415 13.0678 4.40408H12.1601C12.1031 4.40408 12.0466 4.39284 11.9938 4.371C11.9411 4.34916 11.8932 4.31716 11.8529 4.2768C11.8125 4.23645 11.7805 4.18855 11.7587 4.13582C11.7368 4.0831 11.7256 4.02659 11.7256 3.96953V2.28513C11.7547 2.24839 11.771 2.20312 11.772 2.15625C11.7721 2.12731 11.7664 2.09864 11.7554 2.07189C11.7443 2.04514 11.7281 2.02083 11.7076 2.00037C11.6872 1.9799 11.6629 1.96368 11.6361 1.95264C11.6094 1.94159 11.5807 1.93594 11.5518 1.93601H5.67292C5.61451 1.93601 5.55849 1.95921 5.51719 2.00051C5.47588 2.04182 5.45268 2.09783 5.45268 2.15625C5.45268 2.19032 5.46206 2.22143 5.47589 2.25056V3.9478C5.47589 4.00778 5.46408 4.06718 5.44112 4.1226C5.41817 4.17802 5.38452 4.22837 5.3421 4.27079C5.29969 4.3132 5.24933 4.34685 5.19391 4.36981C5.1385 4.39276 5.0791 4.40458 5.01911 4.40458H4.21321C4.09089 4.40458 3.97357 4.35598 3.88708 4.26949C3.80058 4.18299 3.75199 4.06568 3.75199 3.94335V2.26291C3.7716 2.23073 3.78233 2.19392 3.7831 2.15625C3.78316 2.12731 3.77751 2.09864 3.76647 2.07189C3.75542 2.04514 3.7392 2.02083 3.71874 2.00037C3.69827 1.9799 3.67397 1.96368 3.64722 1.95264C3.62047 1.94159 3.5918 1.93594 3.56286 1.93601H0.489862C0.360068 1.93614 0.23562 1.98772 0.143796 2.07945C0.0519713 2.17118 0.000261353 2.29558 0 2.42537V17.0096C0 17.2802 0.219747 17.5 0.489862 17.5H16.6445C16.7743 17.4997 16.8988 17.448 16.9905 17.356C17.0823 17.2641 17.1338 17.1395 17.1338 17.0096V2.42537C17.1336 2.29567 17.0819 2.17134 16.9902 2.07963C16.8985 1.98791 16.7742 1.93627 16.6445 1.93601ZM16.6445 17.0595H0.489862C0.483336 17.0595 0.476874 17.0582 0.47085 17.0557C0.464826 17.0532 0.459361 17.0495 0.454769 17.0449C0.450177 17.0402 0.44655 17.0347 0.444097 17.0287C0.441645 17.0226 0.440416 17.0162 0.440481 17.0096V6.01095H16.6933V17.0091C16.6935 17.0157 16.6923 17.0222 16.6899 17.0282C16.6875 17.0343 16.684 17.0398 16.6794 17.0445C16.6749 17.0492 16.6694 17.0529 16.6634 17.0555C16.6574 17.0581 16.651 17.0595 16.6445 17.0595Z"
                            fill="white"
                          />
                          <path
                            d="M4.67344 3.90237C4.79492 3.90237 4.89368 3.80361 4.89368 3.68213V0.720241C4.89368 0.691318 4.88799 0.662679 4.87692 0.635958C4.86585 0.609237 4.84963 0.584958 4.82918 0.564507C4.80872 0.544056 4.78444 0.527833 4.75772 0.516765C4.731 0.505697 4.70236 0.5 4.67344 0.5C4.64452 0.5 4.61588 0.505697 4.58916 0.516765C4.56244 0.527833 4.53816 0.544056 4.51771 0.564507C4.49726 0.584958 4.48103 0.609237 4.46997 0.635958C4.4589 0.662679 4.4532 0.691318 4.4532 0.720241V3.68262C4.4532 3.8041 4.55196 3.90237 4.67344 3.90237ZM12.6505 3.90237C12.772 3.90237 12.8707 3.80361 12.8707 3.68213V0.720241C12.8707 0.691318 12.865 0.662679 12.854 0.635958C12.8429 0.609237 12.8267 0.584958 12.8062 0.564507C12.7858 0.544056 12.7615 0.527833 12.7348 0.516765C12.7081 0.505697 12.6794 0.5 12.6505 0.5C12.6216 0.5 12.5929 0.505697 12.5662 0.516765C12.5395 0.527833 12.5152 0.544056 12.4948 0.564507C12.4743 0.584958 12.4581 0.609237 12.447 0.635958C12.4359 0.662679 12.4303 0.691318 12.4303 0.720241V3.68262C12.4303 3.8041 12.5285 3.90237 12.6505 3.90237Z"
                            fill="white"
                          />
                          <path
                            d="M3.5352 9.34271C4.20556 9.34271 4.74899 8.79927 4.74899 8.12891C4.74899 7.45856 4.20556 6.91512 3.5352 6.91512C2.86484 6.91512 2.32141 7.45856 2.32141 8.12891C2.32141 8.79927 2.86484 9.34271 3.5352 9.34271Z"
                            fill="white"
                          />
                          <path
                            d="M7.0235 9.34271C7.69386 9.34271 8.23729 8.79927 8.23729 8.12891C8.23729 7.45856 7.69386 6.91512 7.0235 6.91512C6.35314 6.91512 5.80971 7.45856 5.80971 8.12891C5.80971 8.79927 6.35314 9.34271 7.0235 9.34271Z"
                            fill="white"
                          />
                          <path
                            d="M10.5113 9.34271C11.1817 9.34271 11.7251 8.79927 11.7251 8.12891C11.7251 7.45856 11.1817 6.91512 10.5113 6.91512C9.84095 6.91512 9.29752 7.45856 9.29752 8.12891C9.29752 8.79927 9.84095 9.34271 10.5113 9.34271Z"
                            fill="white"
                          />
                          <path
                            d="M3.5352 12.7229C4.20556 12.7229 4.74899 12.1794 4.74899 11.5091C4.74899 10.8387 4.20556 10.2953 3.5352 10.2953C2.86484 10.2953 2.32141 10.8387 2.32141 11.5091C2.32141 12.1794 2.86484 12.7229 3.5352 12.7229Z"
                            fill="white"
                          />
                          <path
                            d="M7.0235 12.7229C7.69386 12.7229 8.23729 12.1794 8.23729 11.5091C8.23729 10.8387 7.69386 10.2953 7.0235 10.2953C6.35314 10.2953 5.80971 10.8387 5.80971 11.5091C5.80971 12.1794 6.35314 12.7229 7.0235 12.7229Z"
                            fill="white"
                          />
                          <path
                            d="M10.5113 12.7229C11.1817 12.7229 11.7251 12.1794 11.7251 11.5091C11.7251 10.8387 11.1817 10.2953 10.5113 10.2953C9.84095 10.2953 9.29752 10.8387 9.29752 11.5091C9.29752 12.1794 9.84095 12.7229 10.5113 12.7229Z"
                            fill="white"
                          />
                          <path
                            d="M3.5352 16.103C4.20556 16.103 4.74899 15.5596 4.74899 14.8892C4.74899 14.2188 4.20556 13.6754 3.5352 13.6754C2.86484 13.6754 2.32141 14.2188 2.32141 14.8892C2.32141 15.5596 2.86484 16.103 3.5352 16.103Z"
                            fill="white"
                          />
                          <path
                            d="M7.0235 16.103C7.69386 16.103 8.23729 15.5596 8.23729 14.8892C8.23729 14.2188 7.69386 13.6754 7.0235 13.6754C6.35314 13.6754 5.80971 14.2188 5.80971 14.8892C5.80971 15.5596 6.35314 16.103 7.0235 16.103Z"
                            fill="white"
                          />
                          <path
                            d="M10.5113 16.103C11.1817 16.103 11.7251 15.5596 11.7251 14.8892C11.7251 14.2188 11.1817 13.6754 10.5113 13.6754C9.84095 13.6754 9.29752 14.2188 9.29752 14.8892C9.29752 15.5596 9.84095 16.103 10.5113 16.103Z"
                            fill="white"
                          />
                          <path
                            d="M13.9176 9.34271C14.588 9.34271 15.1314 8.79927 15.1314 8.12891C15.1314 7.45856 14.588 6.91512 13.9176 6.91512C13.2473 6.91512 12.7038 7.45856 12.7038 8.12891C12.7038 8.79927 13.2473 9.34271 13.9176 9.34271Z"
                            fill="white"
                          />
                          <path
                            d="M13.9176 12.7229C14.588 12.7229 15.1314 12.1794 15.1314 11.5091C15.1314 10.8387 14.588 10.2953 13.9176 10.2953C13.2473 10.2953 12.7038 10.8387 12.7038 11.5091C12.7038 12.1794 13.2473 12.7229 13.9176 12.7229Z"
                            fill="white"
                          />
                          <path
                            d="M13.9176 16.103C14.588 16.103 15.1314 15.5596 15.1314 14.8892C15.1314 14.2188 14.588 13.6754 13.9176 13.6754C13.2473 13.6754 12.7038 14.2188 12.7038 14.8892C12.7038 15.5596 13.2473 16.103 13.9176 16.103Z"
                            fill="white"
                          />
                        </svg>
                        <p className="">{movie.release_date.slice(0, 4)}</p>
                      </div>
                      <div className="flex flex-row items-center gap-x-[5.35px] text-[10px] md:text-base">
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
                            d="M6.78369 0.349998C6.9163 0.349998 7.04348 0.402677 7.13725 0.496445C7.23102 0.590213 7.28369 0.71739 7.28369 0.849998V3.022C7.28369 3.15461 7.23102 3.28178 7.13725 3.37555C7.04348 3.46932 6.9163 3.522 6.78369 3.522C6.65109 3.522 6.52391 3.46932 6.43014 3.37555C6.33637 3.28178 6.28369 3.15461 6.28369 3.022V1.372C5.02291 1.48411 3.83628 2.01634 2.91408 2.88334C1.99188 3.75035 1.38751 4.90191 1.19789 6.15338C1.00827 7.40486 1.24438 8.68377 1.86836 9.78504C2.49233 10.8863 3.46803 11.7462 4.63902 12.2267C5.81001 12.7073 7.10845 12.7807 8.32616 12.4353C9.54387 12.0898 10.6103 11.3455 11.3545 10.3216C12.0987 9.29771 12.4775 8.05359 12.4302 6.78871C12.3829 5.52383 11.9122 4.31146 11.0937 3.346C11.0491 3.29627 11.0149 3.2381 10.9931 3.17494C10.9714 3.11177 10.9625 3.04488 10.967 2.97822C10.9715 2.91156 10.9894 2.84649 11.0195 2.78684C11.0496 2.72719 11.0913 2.67418 11.1422 2.63094C11.1932 2.5877 11.2522 2.5551 11.316 2.53507C11.3797 2.51505 11.4468 2.508 11.5133 2.51434C11.5798 2.52069 11.6444 2.54029 11.7032 2.57201C11.762 2.60373 11.8139 2.64691 11.8557 2.699C12.8356 3.85454 13.3916 5.31006 13.4315 6.82463C13.4715 8.3392 12.993 9.822 12.0754 11.0276C11.1578 12.2332 9.85598 13.0893 8.38549 13.4542C6.91499 13.8191 5.36398 13.671 3.98916 13.0343C2.61435 12.3975 1.49818 11.3105 0.825406 9.95293C0.152629 8.5954 -0.0364161 7.04883 0.289564 5.56922C0.615544 4.08961 1.437 2.76567 2.61797 1.81655C3.79894 0.867424 5.2686 0.350027 6.78369 0.349998ZM7.54369 7.58L10.0597 4.073C10.0932 4.02486 10.1087 3.96647 10.1035 3.90805C10.0983 3.84963 10.0727 3.7949 10.0313 3.75343C9.98979 3.71196 9.93506 3.68639 9.87664 3.68119C9.81822 3.67599 9.75984 3.6915 9.71169 3.725L6.20269 6.24C6.08979 6.32128 5.99591 6.42614 5.92754 6.5473C5.85917 6.66846 5.81795 6.80303 5.80673 6.9417C5.79552 7.08036 5.81457 7.21981 5.86259 7.35039C5.9106 7.48096 5.98641 7.59954 6.08478 7.69791C6.18316 7.79628 6.30174 7.8721 6.43231 7.92011C6.56288 7.96812 6.70233 7.98718 6.841 7.97596C6.97966 7.96475 7.11424 7.92353 7.2354 7.85516C7.35656 7.78679 7.46141 7.6929 7.54269 7.58H7.54369Z"
                            fill="white"
                          />
                        </svg>
                        <p className="">{convertMinutes(movie.runtime)}</p>
                      </div>
                      <div className="flex flex-row text-[10px] md:text-base items-center gap-x-[5.35px]">
                        <svg
                          width="18"
                          height="16"
                          viewBox="0 0 18 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M8.93384 12.8589L14.1868 16L12.7928 10.08L17.4338 6.09684L11.3223 5.57474L8.93384 0L6.54534 5.57474L0.433838 6.09684L5.06634 10.08L3.68084 16L8.93384 12.8589Z"
                            fill="white"
                          />
                        </svg>
                        <p className="">{movie.vote_average}</p>
                      </div>
                    </div>
                    <p className=" font-[500] mt-[24px] md:text-[16px] leading-[24px] text-[12px] ">
                      {movie.overview}
                    </p>
                  </div>
                </div>
              </div>
            );
          })
        //    :
        //   errorFetching
          }
      </Slider>
    </SliderWrapper>
  );
};

export default Hero;
