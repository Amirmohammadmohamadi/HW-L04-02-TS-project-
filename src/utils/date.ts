export const formtDate = (iso:string):string => {
    return new Date(iso).toLocaleDateString("fa-IR",{
        year:"numeric",
        month:"long",
        day:"numeric"
    });
};

export const isOverdue = (dueDate:string):boolean => {
    return new Date(dueDate).getTime() < Date.now();
};

export const isdueSoon = (dueDate:string,hours=24):boolean => {
    const diff = new Date(dueDate).getTime() - Date.now();
    return diff > 0 && diff < hours * 60 * 60 *100;
};