import director from "./director.js"
import actor_actress from "./actor_actress.js"
import writer from "./writer.js"

class Data{
    language = ['Pushto', 'Turkmen', 'other', 'Czech', 'Tamil', 'Romance languages', 'Polish', 'Afrikaans', 'Tajik', 'Bengali', 'Zulu', 'Armenian', 'Latvian', 'Spanish', 'Arabic', 'Galician', 'Telugu', 'Ekajuk', 'Marathi', 'Turkish', 'Bosnian', 'Croatian', 'Malayalam', 'Welsh', 'Panjabi', 'Tagalog', 'Azerbaijani', 'Latin', 'Mandarin Chinese', 'Tswana', 'Russian', 'Norwegian', 'Bulgarian', 'Uzbek', 'Danish', 'Italian', 'Thai', 'Kannada', 'Korean', 'Yue Chinese', 'Hindi', 'Estonian', 'Indonesian', 'Dutch', 'Ukrainian', 'Catalan', 'Hungarian', 'German', 'Georgian', 'Scottish Gaelic', 'Irish', 'Malay (macrolanguage)', 'Yiddish', 'Wolof', 'Lithuanian', 'Gujarati', 'Maori', 'Romanian', 'Slovenian', 'Slovak', 'Kazakh', 'Southern Sotho', 'Urdu', 'Macedonian', 'Basque', 'Serbian', 'Persian', 'Finnish', 'Swedish', 'Portuguese', 'Japanese', 'French', 'Hebrew', 'Swiss German', 'English', 'Kurdish', 'Xhosa']

    titleType = ['short', 'movie', 'tvSeries', 'tvEpisode', 'tvMovie', 'tvMiniSeries', 'tvShort', 'video', 'tvSpecial', 'videoGame']

    genres = ['comedy', 'short', 'documentary', 'horror', 'biography', 'fantasy', 'adventure', 'family', 'drama', 'action', 'crime', 'western', 'animation', 'sport', 'history', 'mystery', 'romance', 'other', 'war', 'sci-fi', 'thriller', 'music', 'musical', 'film-noir', 'news', 'talk-show', 'game-show', 'adult', 'reality-tv']

    getLanguage(){
        return this.language.sort();
    }
    getTitleType(){
        return this.titleType.sort();
    }
    getGenres(){
        return this.genres.sort();
    }

    getActorActress(){
        return actor_actress.sort();
    }

    getDirector(){
        return director.sort();
    }

    getWriter(){
        return writer.sort();
    }

    getRunTime(){
        var time =[]
        for(var i=1; i<=300;i++){
            time.push(i.toString())
        }
        return time
    }

    getPubYear(){
        var year =[]
        for(var i=(new Date()).getFullYear(); i<=(new Date()).getFullYear()+10;i++){
            year.push(i.toString())
        }
        return year
    }

}

const dataList = new Data()

export default dataList;