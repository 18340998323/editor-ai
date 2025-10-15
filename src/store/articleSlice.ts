import { createSlice } from '@reduxjs/toolkit'

export interface Article {
  title: string,
  id: number,
  parentId: number | null,
  level: number,
  content: string,
  like: number,
  collection: number,
  updatedAt: string,
  createdAt: string,
  emoji: string,
  children?: Article[],
  [key: string]: any
}
const initialState = {
  articles: [] as Article[],
  activeArticle: {
    title: '',
    id: 0,
    parentId: null,
    level: 0,
    content: '',
    like: 0,
    collection: 0,
    updatedAt: '',
    createdAt: '',
    emoji: '📝',
    children: []
  } as Article,
  wordsCount: 0,
}
const articleSlice = createSlice({
  name: 'article',
  initialState,
  reducers: {
    setArticles(state, action) {
      state.articles = action.payload
    },
    setActiveArticle(state, action) {
      state.activeArticle = action.payload
    },
    updateActiveArticle(state, action) {
      state.articles.find(article => article.id === action.payload.id)!.title = action.payload.title
      state.activeArticle = { ...state.activeArticle, ...action.payload }
    },
    setWordsCount(state, action) {
      state.wordsCount = action.payload
    }
  }
})

export const { setArticles, setActiveArticle, updateActiveArticle, setWordsCount } = articleSlice.actions

export default articleSlice.reducer
