import {validatePostcode, validatePostcodesOfProperties} from "./postcodeValidation";

describe('isPostcodeValid', () => {
  it.each([
    {postcode: "SW1A 1AA", expectedIsPostcodeValid: true},    // Buckingham Palace
    {postcode: "W1A 0AX", expectedIsPostcodeValid: true},     // BBC
    {postcode: "M1 1AE", expectedIsPostcodeValid: true},      // Manchester
    {postcode: "B33 8TH", expectedIsPostcodeValid: true},     // Birmingham
    {postcode: "CR2 6XH", expectedIsPostcodeValid: true},     // Croydon
    {postcode: "DN55 1PT", expectedIsPostcodeValid: true},    // Doncaster
    {postcode: "EC1A 1BB", expectedIsPostcodeValid: true},    // London
    {postcode: "L1 8JQ", expectedIsPostcodeValid: true},      // Liverpool
    {postcode: "GIR 0AA", expectedIsPostcodeValid: true},     // Special
    {postcode: "BT1 5GS", expectedIsPostcodeValid: true},     // Belfast
    {postcode: "EH1 1YZ", expectedIsPostcodeValid: true},     // Edinburgh
    {postcode: "CF10 1AA", expectedIsPostcodeValid: true},    // Cardiff
    {postcode: "ZZ1 1ZZ", expectedIsPostcodeValid: true},     // Unexisting area, flaw of official UK postcode regex
    {postcode: "sw1a 1aa", expectedIsPostcodeValid: true},    // Lowercase
    {postcode: "sW1a 1Aa", expectedIsPostcodeValid: true},    // Lowercase + uppercase
    {postcode: "12345", expectedIsPostcodeValid: false},      // Not UK
    {postcode: "SW1A", expectedIsPostcodeValid: false},       // Missing inward
    {postcode: " SW1A 1AA ", expectedIsPostcodeValid: false}, // Untrimmed
    {postcode: "EC1A1BB", expectedIsPostcodeValid: false},    // No space
    {postcode: "W1  1AA", expectedIsPostcodeValid: false},    // Double space
    {postcode: "EC1@ 1BB", expectedIsPostcodeValid: false},   // Illegal char
    {postcode: "EC1A 1BBBB", expectedIsPostcodeValid: false}, // Too long inward
    {postcode: "", expectedIsPostcodeValid: false},           // Empty
    {postcode: "   ", expectedIsPostcodeValid: false},        // Only spaces
  ] as const)(
    `should validate the postcode $postcode`,
    async ({postcode, expectedIsPostcodeValid}) => {
      const isPostcodeValid = validatePostcode(postcode);
      expect(isPostcodeValid).toBe(expectedIsPostcodeValid);
    },
  );
});

describe('validatePostcodesOfProperties', () => {
  it("should return the list of property IDs with an invalid UK postcode", async () => {
      const expectedPropertyIdsWithInvalidPostcodes = ["p_1025", "p_1080", "p_1100"];
      const propertyIdsWithInvalidPostcodes = await validatePostcodesOfProperties();
      expect(propertyIdsWithInvalidPostcodes).toEqual(expect.arrayContaining(expectedPropertyIdsWithInvalidPostcodes));
    },
  );
});