interface SkillData {
    id: number;
    name: string;
    icon: string;
    cover: string;
}

export const localSkills: SkillData[] = [
    { id: 1, name: 'Plomería', icon: require('../assets/skills/Plomeria.png'), cover: require('../assets/covers/1.png') },
    { id: 2, name: 'Electricidad', icon: require('../assets/skills/Electricidad.png'), cover: require('../assets/covers/2.png') },
    { id: 3, name: 'Limpieza', icon: require('../assets/skills/Limpieza.png'), cover: require('../assets/covers/3.png') },
    { id: 4, name: 'Mecánica', icon: require('../assets/skills/Mecanica.png'), cover: require('../assets/covers/4.png') },
    { id: 5, name: 'Construcción', icon: require('../assets/skills/Construccion.png'), cover: require('../assets/covers/5.png') },
    { id: 6, name: 'Otros', icon: require('../assets/skills/Otros.png'), cover: require('../assets/covers/6.png') },
];