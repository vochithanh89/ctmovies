export const imgUrl = (id) => `https://image.tmdb.org/t/p/w300${id}`;
export const imgUrlFull = (id) => `https://image.tmdb.org/t/p/original${id}`;
export const youtubeThumnailUrl = (id) => `https://i.ytimg.com/vi/${id}/mqdefault.jpg`;
export const embedSrc = (mediaType, id, season, episode) => {
    if (mediaType === 'movie') {
        return `https://2embed.org/embed/${id}`;
    } else if (mediaType === 'tv') {
        return `https://2embed.org/embed/${id}/${season || ''}/${episode || ''}`;
    }
};

export const languages = [
    {
        value: 'xx',
        label: 'No Language',
        action: 'languageChange',
    },
    {
        value: 'en',
        label: 'English',
        action: 'languageChange',
    },
    {
        value: 'zh',
        label: 'Chinese',
        action: 'languageChange',
    },
    {
        value: 'de',
        label: 'German',
        action: 'languageChange',
    },

    {
        value: 'fr',
        label: 'French',
        action: 'languageChange',
    },

    {
        value: 'hu',
        label: 'Hungarian',
        action: 'languageChange',
    },

    {
        value: 'id',
        label: 'Indonesian',
        action: 'languageChange',
    },

    {
        value: 'is',
        label: 'Icelandic',
        action: 'languageChange',
    },
    {
        value: 'it',
        label: 'Italian',
        action: 'languageChange',
    },

    {
        value: 'ja',
        label: 'Japanese',
        action: 'languageChange',
    },

    {
        value: 'ko',
        label: 'Korean',
        action: 'languageChange',
    },

    {
        value: 'la',
        label: 'Latin',
        action: 'languageChange',
    },

    {
        value: 'ru',
        label: 'Russian',
        action: 'languageChange',
    },

    {
        value: 'th',
        label: 'Thai',
        action: 'languageChange',
    },

    {
        value: 'vi',
        label: 'Vietnamese',
        action: 'languageChange',
    },
];

export const siteName = 'CTMovies';
export const title = 'Newst Movies TV Shows Watching';
export const slogan = 'Watch free Movies, TV Shows, Animes';
