import {Profile} from "../models/profile/Profile";
import {ApplicationResponse} from "../../../shared/models/ApplicationResponse";
import {populate} from "../../../shared/helpers/populate";
import {handleValidateError} from "../../../shared/helpers/handleValitateError";
import {validate} from "class-validator";

const admin = require('firebase-admin');

    export class ServiceProfile {

    static async createProfile(profile: Profile): Promise<ApplicationResponse<Profile>> {
        try {
            const model = populate(Profile, profile);
            await handleValidateError(await validate(model));

            const db = admin.firestore();
            const profileRef = await db.collection('profile').doc(profile.profileName);
            profileRef.set(profile, { merge: true });

            return new ApplicationResponse(200, model)
        }catch(e) {
            throw e
        }
    }

    static async getProfiles(): Promise<ApplicationResponse<any>> {
        try {
            // TODO ainda fazendo
            const db = admin.firestore();

            return db.collection('profile').get()
                .then(snapshot => {
                    const list: any[] = [];
                    snapshot.forEach(doc => {
                        list.push(doc.data())
                    })
                     return new ApplicationResponse(200, list)
                }).catch(err => {
                    return new ApplicationResponse(400, err, err.message)
                });
        }catch(e) {
            throw e
        }
    }

    static async getProfile(profileName: string): Promise<ApplicationResponse<any>> {
        try {
            const db = admin.firestore();
            const profileRef = await db.collection('profile').doc(profileName).get();
            return new ApplicationResponse(200, profileRef.data())
        }catch(e) {
            throw e
        }
    }
}
