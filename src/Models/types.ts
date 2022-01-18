export interface UserType {
  userId: number;
  name: string;
  nickname: string;
  profileImage: string;
  email: string;
}

export interface RoutineType {
  routineId: number;
  name: string;
  emoji: string;
  color: string;
  startGoalTime: string;
  durationGoalTime: number;
  weeks: string[];
  routineCategory: string[];
  missionDetailResponses: MissionType[];
  // routineCompletions: RoutineCompletionType[];
}

export interface MissionType {
  missionId: number;
  emoji: string;
  name: string;
  color: string;
  durationGoalTime: number;
  orders: number;
}

export interface RoutineCompletionType {
  routineCompletionId: number;
  routineInfo: RoutineInfoType;
  date: string;
  startTime: string;
  endTime: string;
  userDurationTime: number;
  missionCompletions: MissionCompletionType[];
}

export interface RoutineInfoType {
  title: string;
  emoji: string;
  color: string;
  startGoalTime: string;
  durationGoalTime: number;
  routineCategories: string[];
}

export interface MissionCompletionType {
  missionCompletionId: number;
  missionId: number;
  date: string;
  durationGoalTime: number;
  userDurationTime: number;
}

export interface RoutinePostType {
  postId: number;
  title: string;
  user: Omit<UserType, 'email'>;
  content: string;
  routine: {
    routineId: number;
    name: string;
    emoji: string;
    category: string[];
    durationGoalTime: number;
    missions: Omit<MissionType, 'orders'>[];
  };
  createdAt: string;
  updatedAt: string;
  comments: CommentType[];
  likes: { userId: number }[];
}

export interface RoutinePostWindowType {
  createdAt: string;
  likesResponse: [
    {
      userId: number;
    },
  ];
  postId: number;
  content: string;
  routine: {
    category: [string];
    durationGoalTime: number;
    startGoalTime: string;
    emoji: string;
    name: string;
    routineId: number;
    color: string;
    week: string[];
  };
  updatedAt: string;
  user: {
    nickname: string;
    profileImage: string;
    userId: number;
  };
}

export interface CommentType {
  commentId: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  likes: {
    userId: number;
    userName: string;
  }[];
  user: Omit<UserType, 'email'>;
}

export interface PostLikeType {
  postLikeId: number;
  postId: number;
  userId: number;
}

export interface CommentLikeType {
  commentLikeId: number;
  commentId: number;
  userId: number;
}
