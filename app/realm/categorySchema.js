export const categorySchema = {
    name: 'category',
    properties: {
      _id: 'objectId?',
      _partition: 'string',
      category: 'string?',
      questions: 'category_questions[]',
    },
    primaryKey: '_id'
  };
  
  export const category_questionsSchema = {
    name: 'category_questions',
    embedded: true,
    properties: {
      answer: 'string?',
      difficulty: 'int?',
      points: 'int?',
      question: 'string?'
    },
  };
  