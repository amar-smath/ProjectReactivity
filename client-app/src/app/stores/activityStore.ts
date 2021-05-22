import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Activity } from "./../../models/activity";
//import { v4 as uuid } from "uuid";

export default class ActivityStore {
  //activities: Activity[] = [];
  activityRegistery = new Map<string, Activity>();
  selectedActivity: Activity | undefined = undefined;
  loadingInitial = true;
  editMode = false;
  loading = false;

  constructor() {
    makeAutoObservable(this);
    // makeObservable(this, {
    //   title: observable,
    //   setTitle: action,
    // });
  }

  get activitiesByDate() {
    return Array.from(this.activityRegistery.values()).sort(
      (x, y) => Date.parse(x.date) - Date.parse(y.date)
    );
  }

  private getActivity = (id: string) => {
    return this.activityRegistery.get(id);
  };

  private setActivity = (activity: Activity) => {
    activity.date = activity.date.split("T")[0];
    this.activityRegistery.set(activity.id, activity);
  };

  //creating action
  loadingActivities = async () => {
    this.setLoadingInitial(true);
    try {
      const activities = await agent.Activities.list();
      activities.forEach((activity) => {
        this.setActivity(activity);
        // this.activities.push(activity);
      });
      this.setLoadingInitial(false);
    } catch (error) {
      console.log(error);
      this.setLoadingInitial(false);
    }
  };

  loadActivity = async (id: string) => {
    let activity = this.getActivity(id);
    if (activity) {
      this.selectedActivity = activity;
      return activity;
    } else {
      this.setLoadingInitial(true);
      try {
        activity = await agent.Activities.details(id);
        this.setActivity(activity);
        runInAction(() => {
          this.selectedActivity = activity;
        });

        this.setLoadingInitial(false);
        return activity;
      } catch (error) {
        console.log(error);
        this.setLoadingInitial(false);
      }
    }
  };

  setLoadingInitial = (state: boolean) => {
    this.loadingInitial = state;
  };

  // setSelectedActivity = (id: string) => {
  //   this.selectedActivity = this.activityRegistery.get(id);
  //   //this.selectedActivity = this.activities.find((x) => x.id === id);
  // };

  // setCancelSelectedActivity = () => {
  //   this.selectedActivity = undefined;
  // };

  // setOpenForm = (id?: string) => {
  //   id ? this.setSelectedActivity(id) : this.setCancelSelectedActivity();
  //   this.editMode = true;
  // };

  // setCloseForm = () => {
  //   this.editMode = false;
  // };
  createActivity = async (activity: Activity) => {
    this.loading = true;
    //activity.id = uuid();
    try {
      await agent.Activities.create(activity);
      runInAction(() => {
        this.activityRegistery.set(activity.id, activity);
        // this.activities.push(activity);
        this.selectedActivity = activity;
        this.loading = false;
        this.editMode = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loading = false;
      });
    }
  };

  updateActivity = async (activity: Activity) => {
    this.loading = true;
    try {
      await agent.Activities.update(activity);
      runInAction(() => {
        this.activityRegistery.set(activity.id, activity);
        // this.activities = [
        //   ...this.activities.filter((x) => x.id !== activity.id),
        //   activity,
        // ];
        this.selectedActivity = activity;
        this.loading = false;
        this.editMode = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loading = false;
      });
    }
  };

  deleteActivity = async (id: string) => {
    this.loading = true;
    try {
      await agent.Activities.delete(id);
      runInAction(() => {
        this.activityRegistery.delete(id);
        this.loading = false;
        // this.activities = [...this.activities.filter((x) => x.id !== id)];
        //if (this.selectedActivity?.id === id) this.setCancelSelectedActivity();
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loading = false;
      });
    }
  };
}
