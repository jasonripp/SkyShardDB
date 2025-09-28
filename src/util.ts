import type { Unit } from "./components/UnitTable";
import type { FactionColor } from "./main";

// Utility: Parse hint string and get label for value
export function getHintLabel(hint: string, value: number | string): string {
    if (!hint) return String(value ?? "");
    const map: Record<string, string> = {};
    hint.split(',').forEach(pair => {
        const [label, val] = pair.split(':');
        if (label && val !== undefined) map[val.trim()] = label.trim();
    });
    return map[String(value)] ?? String(value ?? "");
}

export function getFactionColor(unit: Unit): FactionColor {
    const factionLabel = getHintLabel((unit as any).Faction_hint, unit.Faction) || 'Basic';
    const factionColor = `faction${factionLabel}` as FactionColor;
    return factionColor;
}