export interface AnalysisResult {
    healthRisk: string;
    irrigation: string;
    yieldForecast: string;
    actionPlan: string;
    riskLevel: 'LOW' | 'MODERATE' | 'HIGH';
}

export const analyzeCrop = (sensor: any): AnalysisResult => {
    const {
        plant_name,
        soil_moisture,
        soil_temperature,
        soil_ph,
        air_temperature,
        humidity,
        leaf_wetness
    } = sensor;

    const plant = plant_name.toLowerCase();

    let healthRisk = "";
    let riskLevel: 'LOW' | 'MODERATE' | 'HIGH' = 'LOW';

    if (humidity > 85 && leaf_wetness > 60 && air_temperature > 25) {
        healthRisk = "High risk of fungal blight outbreaks and spore germination.";
        riskLevel = 'HIGH';
    } else if (humidity > 90 && leaf_wetness > 70) {
        healthRisk = "Elevated risk of Downy Mildew and bacterial leaf spot.";
        riskLevel = 'HIGH';
    } else if (soil_moisture > 85 && soil_temperature > 30) {
        healthRisk = "Root rot (Phytophthora) development likely in warm saturated soil.";
        riskLevel = 'HIGH';
    } else if (air_temperature < 10 && humidity > 80) {
        healthRisk = "Gray mold (Botrytis) potential detected in cool damp environment.";
        riskLevel = 'MODERATE';
    } else if (soil_ph < 5.0) {
        healthRisk = "Soil acidity inducing aluminum toxicity and nutrient lockout.";
        riskLevel = 'HIGH';
    } else if (soil_ph > 8.2) {
        healthRisk = "Alkaline stress causing iron chlorosis and micronutrient deficiency.";
        riskLevel = 'MODERATE';
    } else if (air_temperature > 38) {
        healthRisk = "Severe heat stress detected. Cell wall degradation risk.";
        riskLevel = 'HIGH';
    } else if (humidity < 20 && air_temperature > 35) {
        healthRisk = "High vapor pressure deficit. Risk of stomatal closure and wilting.";
        riskLevel = 'MODERATE';
    } else if (leaf_wetness === 100 && air_temperature > 32) {
        healthRisk = "Leaf scalding risk from excessive moisture in high solar radiation.";
        riskLevel = 'MODERATE';
    } else if (plant === "cacao" && humidity < 60) {
        healthRisk = "Humidity too low for Cacao pod development. Risk of fruit drop.";
        riskLevel = 'MODERATE';
    } else if (plant === "rice" && soil_moisture < 40) {
        healthRisk = "Drought stress in paddy. Critical during panicle initiation.";
        riskLevel = 'HIGH';
    } else if (plant === "tomato" && humidity > 75 && air_temperature < 22) {
        healthRisk = "Late Blight conditions detected. Spreading likely.";
        riskLevel = 'HIGH';
    } else if (plant === "banana" && air_temperature < 15) {
        healthRisk = "Chilling injury risk. Banana leaves and fruit sensitive to cold.";
        riskLevel = 'MODERATE';
    } else if (plant === "corn" && soil_moisture < 30 && air_temperature > 30) {
        healthRisk = "Heat & drought threatening silking and pollination success.";
        riskLevel = 'HIGH';
    } else if (plant === "sugarcane" && soil_moisture > 80 && air_temperature < 18) {
        healthRisk = "Red Rot potential due to poor drainage and cool soil.";
        riskLevel = 'MODERATE';
    } else if (plant === "coffee" && air_temperature > 32) {
        healthRisk = "Coffee leaf scorching and flower abortion risk in high heat.";
        riskLevel = 'HIGH';
    } else if (plant === "pineapple" && soil_ph > 6.5) {
        healthRisk = "Pineapple iron deficiency risk in non-acidic soil.";
        riskLevel = 'MODERATE';
    } else if (plant === "mongo" && humidity > 80) {
        healthRisk = "Powdery mildew risk high for legumes in high humidity.";
        riskLevel = 'MODERATE';
    } else if (soil_moisture > 40 && soil_moisture < 70 && soil_ph > 6.0 && soil_ph < 7.0 && air_temperature > 20 && air_temperature < 28) {
        healthRisk = "Near-optimal growth metrics. Health risk is minimal.";
        riskLevel = 'LOW';
    } else {
        healthRisk = "Baseline conditions detected. Low pathogen pressure currently.";
        riskLevel = 'LOW';
    }

    let irrigation = "";
    if (soil_moisture < 15) {
        irrigation = `Critical deficit. Apply approx. 2,000L/ha immediately to reach field capacity.`;
    } else if (soil_moisture < 30) {
        irrigation = `Shortage detected. Supplemental irrigation of 1,200L/ha required within 12h.`;
    } else if (soil_moisture < 45) {
        irrigation = `Moderate dryness. Apply 600L/ha to maintain optimal vegetative growth.`;
    } else if (soil_moisture > 85) {
        irrigation = `Soil saturated. Terminate all irrigation for 72h. High risk of leaching.`;
    } else if (soil_moisture > 75) {
        irrigation = `High moisture. Delay planned irrigation cycles for 48h.`;
    } else if (plant === "rice" && soil_moisture < 70) {
        irrigation = `Rice requires flood state. Increase water level immediately.`;
    } else {
        irrigation = `Moisture levels stable. No immediate water application required.`;
    }

    let yieldPotential = 100;
    if (riskLevel === 'HIGH') yieldPotential -= 35;
    if (riskLevel === 'MODERATE') yieldPotential -= 15;
    if (soil_moisture < 20 || soil_moisture > 90) yieldPotential -= 10;
    if (soil_ph < 5.5 || soil_ph > 7.5) yieldPotential -= 10;
    if (air_temperature > 35 || air_temperature < 15) yieldPotential -= 5;

    let baseYield = 4.5;
    if (plant === "rice") baseYield = 4.8;
    if (plant === "corn") baseYield = 5.2;
    if (plant === "sugarcane") baseYield = 70.0;
    if (plant === "cacao") baseYield = 0.8;
    if (plant === "coffee") baseYield = 1.2;

    const predictedYield = (baseYield * (yieldPotential / 100)).toFixed(2);
    const yieldForecast = `Projected yield: ${predictedYield} tons/ha (${yieldPotential}% potential).`;

    let actionPlan = "";
    if (riskLevel === 'HIGH') {
        if (humidity > 80) actionPlan = "Apply preventive fungicidal spray immediately. Improve canopy airflow.";
        else if (soil_moisture < 20) actionPlan = "Deploy emergency irrigation and apply mulch to reduce evaporation.";
        else actionPlan = "Check for visible signs of pest/disease. Consult agronomist.";
    } else if (riskLevel === 'MODERATE') {
        if (soil_ph < 5.5) actionPlan = "Schedule liming application during next field entry.";
        else if (air_temperature > 32) actionPlan = "Ensure adequate hydration; monitor for heat-induced leaf wilt.";
        else actionPlan = "Increase monitoring frequency to twice daily.";
    } else {
        if (soil_moisture > 70) actionPlan = "Check drainage systems for blockage before next rain event.";
        else actionPlan = "Maintain current monitoring schedule. Conditions remain stable.";
    }

    if (plant === "rice" && riskLevel === 'LOW') actionPlan = "Maintain water depth at 5-10cm for optimal nutrient uptake.";
    if (plant === "cacao" && humidity < 60) actionPlan = "Mist canopy if possible or ensure understory shade is dense.";
    if (plant === "tomato" && soil_ph < 6.0) actionPlan = "Add calcium to prevent blossom end rot in acidic soil.";
    if (plant === "banana" && air_temperature < 15) actionPlan = "Apply potassium-rich fertilizer to help crops withstand cold.";

    return {
        healthRisk,
        irrigation,
        yieldForecast,
        actionPlan,
        riskLevel
    };
};

export const analyzeSensorData = (sensor: any): string => {
    const analysis = analyzeCrop(sensor);
    return `${analysis.healthRisk} ${analysis.actionPlan}`;
};
