const articles = [
  {
    title: "我的标题1",
    id: 1,
    parentId: null,
    content: '<h1>我的内容1</h1>',
    like: 1,
    collection: 1,
    updatedAt: '2022-07-25-12:00:00',
    createdAt: '2022-07-25-12:00:00',
    emoji: '🦁',
    children: [
      {
        title: "我的标题2",
        id: 2,
        parentId: 1,
        content: '2',
        like: 1,
        collection: 1,
        updatedAt: '2022-07-25-12:00:00',
        createdAt: '2022-07-25-12:00:00',
        emoji: '🦁',
        children: [
          {
            title: "我的标题4",
            id: 4,
            parentId: 2,
            content: '4',
            like: 1,
            collection: 1,
            updatedAt: '2022-07-25-12:00:00',
            createdAt: '2022-07-25-12:00:00',
            emoji: '🦁',
          },
        ]
      },
    ],
  },
  {
    title: "我的标题3",
    id: 3,
    parentId: null,
    content: '3',
    like: 1,
    collection: 1,
    updatedAt: '2022-07-25-12:00:00',
    createdAt: '2022-07-25-12:00:00',
    emoji: '🦁',
  },
];

// 定义文章的接口类型
export interface Article {
  title: string;
  id: number;
  parentId: number | null;
  content: string;
  like: number;
  collection: number;
  updatedAt: string;
  createdAt: string;
  emoji: string;
  children?: Article[];
}

// 递归查找并插入到id和parentId相同的元素
export const insertArticleByIdAndParentId = (articles: Article[], reqBody: Article) => {
  // 创建一个函数来递归查找符合条件的元素
  const findAndInsert = (items: Article[]): boolean => {
    for (let i = 0; i < items.length; i++) {
      const item = items[i];

      // 检查当前元素的id是否与reqBody的parentId相同
      if (item.id === reqBody.parentId) {
        // 确保children数组存在
        item.children = item.children || [];
        // 插入新文章到children数组
        item.children.push(reqBody as any);
        return true;
      }

      // 如果当前元素有children，递归检查children
      if (item.children && item.children.length > 0) {
        const found = findAndInsert(item.children);
        if (found) {
          return true;
        }
      }
    }
    return false;
  };

  // 开始递归查找
  const found = findAndInsert(articles);
  console.log(found);
  
  // 如果没有找到匹配的父元素，仍然将新文章添加到articles数组中
  if (!found) {
    articles.push(reqBody);
  }

  return articles;
};

export default [
  // 获取用户信息接口
  {
    url: '/api/articles',
    method: 'get',
    response: () => {
      // 有就返回成功信息
      return {
        code: 200,
        data: {
          articles
        }
      }
    }
  },
  {
    url: '/api/articles',
    method: 'post',
    response: (req: { body: Article }) => {
      const updatedArticles = insertArticleByIdAndParentId(articles, req.body);
      return {
        code: 200,
        data: {
          articles: updatedArticles
        }
      }
    }
  }

]