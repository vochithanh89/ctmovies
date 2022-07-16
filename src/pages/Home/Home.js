import { settingsSelector } from '@/components/redux/selectors';
import useGetData from '@/hooks/useGetData';
import { getHome } from '@/utils/api';
import { useSelector } from 'react-redux';
import styles from './Home.module.scss';
import { useNavigate } from 'react-router-dom';
import MovieCard from '@/components/MovieCard/MovieCard';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';

// import required modules
import { Autoplay } from 'swiper';
import SliderCard from '@/components/SliderCard/SliderCard';
import Loading from '@/components/Loading/Loading';
import { useEffect } from 'react';
//seo
import { Helmet } from 'react-helmet';
import { siteName, slogan, title } from '@/components/constants/constants';
import homeImg from '@/assets/images/SEO/home.jpg';

function Home() {
    const { language } = useSelector(settingsSelector);
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo({
            top: 0,
        });
    }, []);

    const { isLoading, isError, data } = useGetData('homeList', getHome, language);

    if (isLoading) {
        return (
            <div className={styles.home}>
                <Loading width={70} thickness={4} />
            </div>
        );
    }

    if (isError) {
        navigate('/error');
    }

    return (
        <>
            <Helmet>
                <title>{`${siteName} - ${title}`}</title>
                <meta name="description" content={slogan} />
                <meta property="og:title" content={title} />
                <meta property="og:image" content={homeImg} />
                <meta property="og:site_name" content={siteName} />
                <meta property="og:url" content={window.location.href} />
                <meta property="og:description" content={slogan} />
            </Helmet>

            <div className={styles.home}>
                {data?.map((item, index) => {
                    return (
                        <div key={index} className={styles.swiperWrap}>
                            <h1 className={styles.title}>{item.title}</h1>
                            <Swiper
                                key={index}
                                className={styles.swiper}
                                modules={[Autoplay]}
                                navigation={true}
                                autoplay={
                                    item.slidesPerView && {
                                        delay: 2500,
                                        disableOnInteraction: false,
                                    }
                                }
                                loop={true}
                                slidesPerView={item.slidesPerView || 4.5}
                                breakpoints={
                                    !item.slidesPerView && {
                                        1024: {
                                            slidesPerView: 4.2,
                                            spaceBetween: 30,
                                        },
                                        768: {
                                            slidesPerView: 3.2,
                                            spaceBetween: 20,
                                        },
                                        0: {
                                            slidesPerView: 2.2,
                                            spaceBetween: 20,
                                        },
                                    }
                                }
                            >
                                {item.data.map((movie) => {
                                    return (
                                        <SwiperSlide key={movie.id}>
                                            {item.slidesPerView ? (
                                                <SliderCard
                                                    mediaType={item.mediaType}
                                                    movieName={
                                                        movie.name ||
                                                        movie.title ||
                                                        movie.original_name ||
                                                        movie.original_title
                                                    }
                                                    movieId={movie.id}
                                                    backgroundUrl={movie.backdrop_path}
                                                    description={movie.overview}
                                                />
                                            ) : (
                                                <MovieCard
                                                    type="slider"
                                                    mediaType={item.mediaType}
                                                    movieName={
                                                        movie.name ||
                                                        movie.title ||
                                                        movie.original_name ||
                                                        movie.original_title
                                                    }
                                                    movieId={movie.id}
                                                    posterUrl={movie.poster_path}
                                                />
                                            )}
                                        </SwiperSlide>
                                    );
                                })}
                            </Swiper>
                        </div>
                    );
                })}
            </div>
        </>
    );
}

export default Home;
