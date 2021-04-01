import { Dispatch } from ".."
// import { WellnessProfile } from "@types"
/* import {
  getActivities,
  getProfile,
  createObjectives,
  refreshActivities,
  getObjectives,
  updateObjectiveGoal,
  getActions,
  getGoalPlan,
  getBudgets,
} from "@api/wellness-api"*/

export type WellnessState = {
  // profile?: WellnessProfile
  /* goals: GoalItem[]
  activities: Activity[]
  completedActivities: Activity[]
  actions: Action[][]
  completedActions: Action[][]
  budgets: WellnessBudget[]
  error: string */
}

export type WellnessModel = {
  state: {} ///WellnessState;
  reducers: {
    /* loadActivities: (
      state: WellnessState,
      activities: Activity[],
      doneActivities: Activity[]
    ) => WellnessState;
    loadActions: (
      state: WellnessState,
      actions: Action[][],
      completedActions: Action[][]
    ) => WellnessState;
    updateProfile: (
      state: WellnessState,
      profile: WellnessProfile
    ) => WellnessState;
    setGoal: (state: WellnessState, updatedGoal: GoalItem) => WellnessState;
    setGoals: (state: WellnessState, goals: GoalItem[]) => WellnessState;
    addGoal: (state: WellnessState, goal: GoalItem) => WellnessState;
    setBudgets: (
      state: WellnessState,
      budgets: WellnessBudget[]
    ) => WellnessState;
    setError: (state: WellnessState, error: string) => WellnessState; */
  }
  effects: (
    dispatch: Dispatch
  ) => {
    /* fetchActivities: (payload?: any, rootState?: any) => void;
    fetchObjectives: (payload?: any, rootState?: any) => void;
    fetchActions: (payload: ActionsQuery, rootState?: any) => void;
    refreshActivities: (payload?: any, rootState?: any) => void;
    loadProfile: (payload?: any, rootState?: any) => void;
    sendObjectives: (payload?: any, rootState?: any) => void;
    fetchBudgets: (payload?: any, rootState?: any) => void;
    updateGoal: (payload?: any, rootState?: any) => void; */
  }
}

export const wellness: WellnessModel = {
  state: {
    profile: {
      points: 200,
      first_name: "Vivian",
    },
    /* profile: undefined,
    goals: [],
    activities: [],
    completedActivities: [],
    actions: [],
    completedActions: [],
    budgets: [],
    error: '', */
  },
  reducers: {
    /* loadActivities: (
      state: WellnessState,
      activities: Activity[],
      completedActivities: Activity[]
    ) => {
      return {
        ...state,
        activities: activities,
        completedActivities: completedActivities,
      };
    },
    loadActions: (
      state: WellnessState,
      actions: Action[][],
      completedActions: Action[][]
    ) => {
      return {
        ...state,
        actions,
        completedActions,
      };
    },
    updateProfile: (state: WellnessState, profile: WellnessProfile) => {
      return {
        ...state,
        profile: profile,
      };
    },
    setGoal: (state: WellnessState, updatedGoal: GoalItem) => ({
      ...state,
      goals: state.goals.map((goal: GoalItem) => {
        if (goal.id === updatedGoal.id) {
          return { ...updatedGoal };
        }
        return goal;
      }),
    }),
    setGoals: (state: WellnessState, goals: GoalItem[]) => ({
      ...state,
      goals: goals,
    }),
    addGoal: (state: WellnessState, goal: GoalItem) => ({
      ...state,
      goals: [goal, ...state.goals],
    }),
    setBudgets: (state: WellnessState, budgets: WellnessBudget[]) => {
      return {
        ...state,
        budgets,
      };
    },
    setError: (state: WellnessState, error: string) => ({
      ...state,
      error,
    }), */
  },
  effects: (dispatch: Dispatch) => ({
    /* async fetchActivities(payload?: any, rootState?: any) {
      const { profile } = rootState;
      const { session_token } = profile;

      try {
        const activities = getActivities(session_token);
        const completedActivities = getActivities(session_token, true);
        dispatch.wellness.loadActivities(
          await activities,
          await completedActivities
        );
      } catch (error) {
        dispatch.wellness.setError(error.message);
      }
    },
    async fetchObjectives(payload?: any, rootState?: any) {
      const { profile } = rootState;
      const { session_token } = profile;

      try {
        const objectives = await getObjectives(session_token);

        const actions = await getActions(session_token, {
          start_year: new Date().getFullYear().toString(),
          start_month: new Date().getMonth() + 1,
          num_months: 3,
        });

        if (actions.length) {
          objectives.forEach(async (objective: any) => {
            const goalPlan = await getGoalPlan(session_token, objective.id);
            objective.goalPlan = goalPlan;
          });
        }

        dispatch.wellness.setGoals(objectives);
      } catch (error) {
        dispatch.wellness.setError(error.message);
      }
    },
    async fetchActions(payload: ActionsQuery, rootState?: any) {
      const { profile } = rootState;
      const { session_token } = profile;

      try {
        const actions = await getActions(session_token, payload);
        const completedActions = await getActions(session_token, {
          ...payload,
          start_year: new Date().getFullYear().toString(),
          start_month: new Date().getMonth() + 1,
          completed: true,
        });
        dispatch.wellness.loadActions(actions, completedActions);
        return actions;
      } catch (error) {
        dispatch.wellness.setError(error.message);
      }
    },
    async fetchBudgets(payload?: any, rootState?: any) {
      const { profile } = rootState;
      const { session_token } = profile;

      try {
        const budgets = await getBudgets(session_token);
        dispatch.wellness.setBudgets(budgets);
      } catch (error) {
        console.log('ERROR');
        dispatch.wellness.setError(error.message);
      }
    },
    async refreshActivities(payload?: any, rootState?: any) {
      const { profile } = rootState;
      const { session_token } = profile;

      try {
        const activities = refreshActivities(session_token);
        const completedActivities = getActivities(session_token, true);
        dispatch.wellness.loadActivities(
          await activities,
          await completedActivities
        );
      } catch (error) {
        dispatch.wellness.setError(error.message);
      }
    },
    async loadProfile(payload?: any, rootState?: any) {
      const { profile } = rootState;
      const { session_token } = profile;

      try {
        const profile = getProfile(session_token);

        dispatch.wellness.updateProfile(await profile);
      } catch (error) {
        dispatch.wellness.setError(error.message);
      }
    },
    async sendObjectives(payload?: any, rootState?: any) {
      const { profile, wellness } = rootState;
      const { session_token } = profile;

      try {
        const objectives = createObjectives(session_token, wellness.goals);
        dispatch.wellness.setGoals(await objectives);
      } catch (error) {
        dispatch.wellness.setError(error.message);
      }
    },
    async updateGoal(payload?: any, rootState?: any) {
      const { profile } = rootState;
      const { objectiveGoal, objectiveId } = payload;
      const { session_token } = profile;

      try {
        const saved_goal = updateObjectiveGoal(
          session_token,
          objectiveId,
          objectiveGoal
        );
        console.log('saved objective', await saved_goal);
      } catch (error) {
        dispatch.wellness.setError(error.message);
      }
    }, */
  }),
}
