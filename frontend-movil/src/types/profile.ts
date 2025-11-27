// INTERFACES PARA RELLENAR DATOS DE LOS TRABAJADORES

// -------------------- TARJETAS EN HOME Y SEARCH ---------------------

export interface Profile {
    id_worker: number;
    fullName: string;
    pfpFileName: string; // image path
    gallery: string[]; // array de galeria
    rating: string;
    totalReviews: number;
    skills: string[]; // array de skills
    score: string;
}

// ---------------------------- PERFIL ----------------------------

// S1: INFO GENERAL

export interface WorkerInfo {
    id: number;
    fullName: string;
    pfpFileName: string;
    biography: string;
    skills: string[];
    reviewAverage: number;
    totalReviews: number;
    gallery: string[];
}

// S2: CALIFICACIÓN

export interface Rating {
    id: number;
    rating: string;
    skill: string;
}

// S3: RESEÑAS

export interface Review {
    id: number;
    username: string;
    pfpFileName: string;
    date: string;
    skill: string;
    rating: number;
    review: string;
    gallery: string[];
}

// OBJETO PRINCIPAL DATA

export interface WorkerProfileData {
    info: WorkerInfo;
    ratings: Rating[];
    reviews: Review[];
}

export interface WorkerProfileResponse {
    success: boolean;
    data: WorkerProfileData;
}