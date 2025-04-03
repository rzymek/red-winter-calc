import { describe, expect, it, beforeEach } from "vitest";
import { CombatProbability } from "./combatProbability.tsx";
import { render, RenderResult } from "@testing-library/preact";
import { resetState, state } from "../../state.ts";

// Define a type for combat column entries
type CombatEntry = { roll2d6: number; defender: number; attacker: number };
type CombatColumn = CombatEntry[];

describe('CombatProbability', () => {
  // Reset state before each test
  beforeEach(() => {
    resetState();
    document.body.innerHTML = '';
  });

  // Helper function to create a standard combat column with all 2d6 rolls
  function createStandardCombatColumn(entries: Partial<Record<number, Partial<CombatEntry>>>): CombatColumn {
    // Create a default combat column with all zeros
    const defaultColumn: CombatColumn = Array.from({ length: 11 }, (_, i) => ({
      roll2d6: i + 2, // 2d6 rolls range from 2 to 12
      defender: 0,
      attacker: 0
    }));

    // Override with provided entries
    return defaultColumn.map(entry => {
      const override = entries[entry.roll2d6];
      return override ? { ...entry, ...override } : entry;
    });
  }

  // Helper function to assert probability row content
  function assertProbability(
    renderResult: RenderResult,
    label: string,
    expectedPercentage: string,
    description?: string
  ) {
    const element = renderResult.getByText(label).closest('tr');
    expect(element, `${label} row should exist`).toBeTruthy();
    expect(element?.textContent, description).toContain([label, expectedPercentage].join(''));
  }

  it('should calculate attacker loss probability', () => {
    // Arrange - Attacker loss on rolls 2 and 4
    const combatColumn = createStandardCombatColumn({
      2: { attacker: 1 },
      4: { defender: 1, attacker: 1 }
    });

    // Act
    const renderResult = render(<CombatProbability combatColumn={combatColumn} />);

    // Assert - 4/36 = 11.1% rounded to 11%
    assertProbability(renderResult, "Attacker loss", "11%",
      "Attacker loss should be for rolls 2 and 4 (1/36 + 3/36 = 4/36 = 11.1%)");
  });

  it('should calculate attacker only loss probability', () => {
    // Arrange - Attacker only loss on roll 2
    const combatColumn = createStandardCombatColumn({
      2: { attacker: 1 },
      4: { defender: 1, attacker: 1 }, // Both attacker and defender loss
      5: { defender: 1 },
      6: { defender: 2 }
    });

    // Act
    const renderResult = render(<CombatProbability combatColumn={combatColumn} />);

    // Assert - 1/36 = 2.8% rounded to 3%
    assertProbability(renderResult, "Attacker only loss", "3%",
      "Attacker only loss should be for roll 2 (1/36 = 2.8%)");
  });

  it('should calculate defender loss probability', () => {
    // Arrange - Defender loss on rolls 4, 5, and 6
    const combatColumn = createStandardCombatColumn({
      2: { attacker: 1 },
      4: { defender: 1, attacker: 1 },
      5: { defender: 1 },
      6: { defender: 2 }
    });

    // Act
    const renderResult = render(<CombatProbability combatColumn={combatColumn} />);

    // Assert - 12/36 = 33.3% rounded to 33%
    assertProbability(renderResult, "Defender loss", "33%",
      "Defender loss should be for rolls 4, 5, and 6 (3/36 + 4/36 + 5/36 = 12/36 = 33.3%)");
  });

  it('should calculate defender only loss probability', () => {
    // Arrange - Defender only loss on rolls 5 and 6
    const combatColumn = createStandardCombatColumn({
      2: { attacker: 1 },
      4: { defender: 1, attacker: 1 }, // Both attacker and defender loss
      5: { defender: 1 }, // Defender only loss
      6: { defender: 2 }  // Defender only loss
    });

    // Act
    const renderResult = render(<CombatProbability combatColumn={combatColumn} />);

    // Assert - 9/36 = 25%
    assertProbability(renderResult, "Defender loss only", "25%",
      "Defender only loss should be for rolls 5 and 6 (4/36 + 5/36 = 9/36 = 25%)");
  });

  it('should handle empty combat column', () => {
    // Arrange
    const combatColumn: CombatColumn = [];

    // Act
    const renderResult = render(<CombatProbability combatColumn={combatColumn} />);

    // Assert - all probabilities should be 0%
    assertProbability(renderResult, "Attacker loss", "0%", "Empty column should have 0% probability");
  });

  it('should verify probability sum is correct for all possible outcomes', () => {
    // Arrange - Create a complete combat column with all possible 2d6 rolls (2-12)
    // Defender losses on rolls 2-6, attacker losses on rolls 7-12
    const combatColumn = createStandardCombatColumn({
      2: { defender: 1 },
      3: { defender: 1 },
      4: { defender: 1 },
      5: { defender: 1 },
      6: { defender: 1 },
      7: { attacker: 1 },
      8: { attacker: 1 },
      9: { attacker: 1 },
      10: { attacker: 1 },
      11: { attacker: 1 },
      12: { attacker: 1 }
    });

    // Act
    const renderResult = render(<CombatProbability combatColumn={combatColumn} />);

    // Assert
    // Attacker loss: rolls 7-12 = 21/36 = 58.3% rounded to 58%
    assertProbability(renderResult, "Attacker loss", "58%",
      "Attacker loss should be sum of rolls 7-12 (21/36 = 58.3%)");

    // Defender loss: rolls 2-6 = 15/36 = 41.7% rounded to 42%
    assertProbability(renderResult, "Defender loss", "42%",
      "Defender loss should be sum of rolls 2-6 (15/36 = 41.7%)");
  });

  it('should handle hotel state effect', () => {
    // Arrange
    state.hotel = true;
    const combatColumn = createStandardCombatColumn({
      2: { defender: 2 },
      3: { defender: 1 },
      4: { attacker: 1 }
    });

    // Act
    const renderResult = render(<CombatProbability combatColumn={combatColumn} />);

    // Assert
    // With hotel effect, defender losses are reduced by 1
    // Only roll 2 counts (1/36 = 2.8% rounded to 3%)
    assertProbability(renderResult, "Defender loss", "3%",
      "With hotel effect, only roll 2 counts as defender loss (1/36 = 2.8%)");
  });

  it('should handle assault state effect', () => {
    // Arrange
    state.assault = true;
    const combatColumn = createStandardCombatColumn({
      2: { attacker: 2 },
      3: { attacker: 1 },
      4: { defender: 1 }
    });

    // Act
    const renderResult = render(<CombatProbability combatColumn={combatColumn} />);

    // Assert
    // Attacker loss on rolls 2 and 3 (3/36 = 8.3% rounded to 8%)
    assertProbability(renderResult, "Attacker loss", "8%",
      "Attacker loss should be for rolls 2 and 3 (3/36 = 8.3%)");
  });
});