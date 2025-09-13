import express from 'express';
import { lstat } from 'fs';

const canteens = {canteenA: {
    queue : [], 
    lastAddedToken : 0, 
    }
}

export function joinQueue(canteenName, studentId, orders){
    const token = canteens[canteenName].lastAddedToken + 1;
    canteens[canteenName].lastAddedToken++;
    const entry = {studentId, token, orders};
    canteens[canteenName].queue.push(entry);
    return token;
}

export function leaveQueue(canteenName, token){
    const index = canteens[canteenName].queue.findIndex(e => e.token === token);
    if (index !== -1) canteens[canteenName].queue.splice(index, 1)
}

joinQueue("canteenA", 1234)