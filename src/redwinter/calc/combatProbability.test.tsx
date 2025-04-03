import { describe, expect, it, beforeEach } from "vitest";
import { CombatProbability } from "./combatProbability.tsx";
import { render } from "@testing-library/preact";
import { state } from "../../state.ts";

describe('CombatProbability', () => {
  // Reset state before each test
  beforeEach(() => {
    // Reset state
    state.hotel = false;
    state.assault = false;
  });

  it('should calculate attacker loss probability', () => {
    // Arrange
    const combatColumn = [
      { roll2d6: 2, defender: 0, attacker: 1 },
      { roll2d6: 3, defender: 0, attacker: 0 },
      { roll2d6: 4, defender: 1, attacker: 1 },
      { roll2d6: 5, defender: 1, attacker: 0 },
      { roll2d6: 6, defender: 2, attacker: 0 },
      { roll2d6: 7, defender: 0, attacker: 0 },
      { roll2d6: 8, defender: 0, attacker: 0 },
      { roll2d6: 9, defender: 0, attacker: 0 },
      { roll2d6: 10, defender: 0, attacker: 0 },
      { roll2d6: 11, defender: 0, attacker: 0 },
      { roll2d6: 12, defender: 0, attacker: 0 },
    ];

    // Act
    const { getByText } = render(<CombatProbability combatColumn={combatColumn} />);

    // Assert
    // Attacker loss should be for rolls 2 and 4
    // Roll 2: 1/36 probability, Roll 4: 3/36 probability
    // Total: 4/36 = 0.111 = 11.1%
    const element = getByText("Attacker loss").closest('tr');
    expect(element).toBeTruthy();
    expect(element?.textContent).toContain(['Attacker loss','11%'].join(''));
  });

  it('should calculate attacker only loss probability', () => {
    // Arrange
    const combatColumn = [
      { roll2d6: 2, defender: 0, attacker: 1 },
      { roll2d6: 3, defender: 0, attacker: 0 },
      { roll2d6: 4, defender: 1, attacker: 1 }, // Both attacker and defender loss
      { roll2d6: 5, defender: 1, attacker: 0 },
      { roll2d6: 6, defender: 2, attacker: 0 },
      { roll2d6: 7, defender: 0, attacker: 0 },
      { roll2d6: 8, defender: 0, attacker: 0 },
      { roll2d6: 9, defender: 0, attacker: 0 },
      { roll2d6: 10, defender: 0, attacker: 0 },
      { roll2d6: 11, defender: 0, attacker: 0 },
      { roll2d6: 12, defender: 0, attacker: 0 },
    ];

    // Act
    const { getByText } = render(<CombatProbability combatColumn={combatColumn} />);

    // Assert
    // Attacker only loss should be for roll 2 (1/36 = 0.028 = 2.8%)
    const element = getByText("Attacker only loss").closest('tr');
    expect(element).toBeTruthy();
    expect(element?.textContent).toContain(['Attacker only loss','2.8%'].join(''));
  });

  it('should calculate defender loss probability', () => {
    // Arrange
    const combatColumn = [
      { roll2d6: 2, defender: 0, attacker: 1 },
      { roll2d6: 3, defender: 0, attacker: 0 },
      { roll2d6: 4, defender: 1, attacker: 1 },
      { roll2d6: 5, defender: 1, attacker: 0 },
      { roll2d6: 6, defender: 2, attacker: 0 },
      { roll2d6: 7, defender: 0, attacker: 0 },
      { roll2d6: 8, defender: 0, attacker: 0 },
      { roll2d6: 9, defender: 0, attacker: 0 },
      { roll2d6: 10, defender: 0, attacker: 0 },
      { roll2d6: 11, defender: 0, attacker: 0 },
      { roll2d6: 12, defender: 0, attacker: 0 },
    ];

    // Act
    const { getByText } = render(<CombatProbability combatColumn={combatColumn} />);

    // Assert
    // Defender loss should be for rolls 4, 5, and 6
    // Roll 4: 3/36, Roll 5: 4/36, Roll 6: 5/36
    // Total: 12/36 = 0.333 = 33.3%
    const element = getByText("Defender loss").closest('tr');
    expect(element).toBeTruthy();
    expect(element?.textContent).toContain(['Defender loss','33.3%'].join(''));
  });

  it('should calculate defender only loss probability', () => {
    // Arrange
    const combatColumn = [
      { roll2d6: 2, defender: 0, attacker: 1 },
      { roll2d6: 3, defender: 0, attacker: 0 },
      { roll2d6: 4, defender: 1, attacker: 1 }, // Both attacker and defender loss
      { roll2d6: 5, defender: 1, attacker: 0 }, // Defender only loss
      { roll2d6: 6, defender: 2, attacker: 0 }, // Defender only loss
      { roll2d6: 7, defender: 0, attacker: 0 },
      { roll2d6: 8, defender: 0, attacker: 0 },
      { roll2d6: 9, defender: 0, attacker: 0 },
      { roll2d6: 10, defender: 0, attacker: 0 },
      { roll2d6: 11, defender: 0, attacker: 0 },
      { roll2d6: 12, defender: 0, attacker: 0 },
    ];

    // Act
    const { getByText } = render(<CombatProbability combatColumn={combatColumn} />);

    // Assert
    // Defender only loss should be for rolls 5 and 6
    // Roll 5: 4/36, Roll 6: 5/36
    // Total: 9/36 = 0.25 = 25.0%
    const element = getByText("Defender loss only").closest('tr');
    expect(element).toBeTruthy();
    expect(element?.textContent).toContain(['Defender loss only','25.0%'].join(''));
  });

  it('should handle empty combat column', () => {
    // Arrange
    const combatColumn: { roll2d6: number; defender: number; attacker: number }[] = [];

    // Act
    const { getByText } = render(<CombatProbability combatColumn={combatColumn} />);

    // Assert - all probabilities should be 0%
    const element = getByText("Attacker loss").closest('tr');
    expect(element).toBeTruthy();
    expect(element?.textContent).toContain(['Attacker loss','0.0%'].join(''));
  });

  it('should verify probability sum is correct for all possible outcomes', () => {
    // Arrange
    // Create a complete combat column with all possible 2d6 rolls (2-12)
    const combatColumn = [
      { roll2d6: 2, defender: 1, attacker: 0 },
      { roll2d6: 3, defender: 1, attacker: 0 },
      { roll2d6: 4, defender: 1, attacker: 0 },
      { roll2d6: 5, defender: 1, attacker: 0 },
      { roll2d6: 6, defender: 1, attacker: 0 },
      { roll2d6: 7, defender: 0, attacker: 1 },
      { roll2d6: 8, defender: 0, attacker: 1 },
      { roll2d6: 9, defender: 0, attacker: 1 },
      { roll2d6: 10, defender: 0, attacker: 1 },
      { roll2d6: 11, defender: 0, attacker: 1 },
      { roll2d6: 12, defender: 0, attacker: 1 },
    ];

    // Act
    const { getByText } = render(<CombatProbability combatColumn={combatColumn} />);

    // Assert
    // Attacker loss probability should be sum of rolls 7-12
    // Roll 7: 6/36, Roll 8: 5/36, Roll 9: 4/36, Roll 10: 3/36, Roll 11: 2/36, Roll 12: 1/36
    // Total: 21/36 = 0.583 = 58.3%
    const attackerElement = getByText("Attacker loss").closest('tr');
    expect(attackerElement).toBeTruthy();
    expect(attackerElement?.textContent).toContain(['Attacker loss','58.3%'].join(''));

    // Defender loss probability should be sum of rolls 2-6
    // Roll 2: 1/36, Roll 3: 2/36, Roll 4: 3/36, Roll 5: 4/36, Roll 6: 5/36
    // Total: 15/36 = 0.417 = 41.7%
    const defenderElement = getByText("Defender loss").closest('tr');
    expect(defenderElement).toBeTruthy();
    expect(defenderElement?.textContent).toContain(['Defender loss','41.7%'].join(''));
  });

  it('should handle hotel state effect', () => {
    // Arrange
    state.hotel = true;
    const combatColumn = [
      { roll2d6: 2, defender: 2, attacker: 0 },
      { roll2d6: 3, defender: 1, attacker: 0 },
      { roll2d6: 4, defender: 0, attacker: 1 },
      { roll2d6: 5, defender: 0, attacker: 0 },
      { roll2d6: 6, defender: 0, attacker: 0 },
      { roll2d6: 7, defender: 0, attacker: 0 },
      { roll2d6: 8, defender: 0, attacker: 0 },
      { roll2d6: 9, defender: 0, attacker: 0 },
      { roll2d6: 10, defender: 0, attacker: 0 },
      { roll2d6: 11, defender: 0, attacker: 0 },
      { roll2d6: 12, defender: 0, attacker: 0 },
    ];

    // Act
    const { getByText } = render(<CombatProbability combatColumn={combatColumn} />);

    // Assert
    // With hotel effect, defender losses are reduced by 1
    // Roll 2: defender losses = 2-1 = 1, probability = 1/36
    // Roll 3: defender losses = 1-1 = 0, probability = 2/36 (but doesn't count as a loss)
    // Total defender loss probability: 1/36 = 0.028 = 2.8%
    const element = getByText("Defender loss").closest('tr');
    expect(element).toBeTruthy();
    expect(element?.textContent).toContain(['Defender loss','2.8%'].join('')); // Only roll 2 counts (1/36)
  });

  it('should handle assault state effect', () => {
    // Arrange
    state.assault = true;
    const combatColumn = [
      { roll2d6: 2, defender: 0, attacker: 2 },
      { roll2d6: 3, defender: 0, attacker: 1 },
      { roll2d6: 4, defender: 1, attacker: 0 },
      { roll2d6: 5, defender: 0, attacker: 0 },
      { roll2d6: 6, defender: 0, attacker: 0 },
      { roll2d6: 7, defender: 0, attacker: 0 },
      { roll2d6: 8, defender: 0, attacker: 0 },
      { roll2d6: 9, defender: 0, attacker: 0 },
      { roll2d6: 10, defender: 0, attacker: 0 },
      { roll2d6: 11, defender: 0, attacker: 0 },
      { roll2d6: 12, defender: 0, attacker: 0 },
    ];

    // Act
    const { getByText } = render(<CombatProbability combatColumn={combatColumn} />);

    // Assert
    // Attacker loss should be for rolls 2 and 3
    // Roll 2: probability = 1/36, Roll 3: probability = 2/36
    // Total: 3/36 = 0.083 = 8.3%
    const element = getByText("Attacker loss").closest('tr');
    expect(element).toBeTruthy();
    expect(element?.textContent).toContain(['Attacker loss','8.3%'].join(''));
  });
});